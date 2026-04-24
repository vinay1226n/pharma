const http = require("http");
const https = require("https");

const BASE_URL = "http://localhost:5000";
let adminToken = null;

// Helper function to make API calls
function makeRequest(method, path, body = null, token = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(BASE_URL + path);
    const payload = body ? JSON.stringify(body) : null;
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (token) {
      options.headers["Authorization"] = `Bearer ${token}`;
    }
    if (payload) {
      options.headers["Content-Length"] = Buffer.byteLength(payload);
    }

    const protocol = url.protocol === "https:" ? https : http;
    const req = protocol.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        try {
          const parsed = JSON.parse(data);
          resolve({
            status: res.statusCode,
            data: parsed,
            headers: res.headers,
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: data,
            headers: res.headers,
          });
        }
      });
    });

    req.on("error", reject);
    if (payload) {
      req.write(payload);
    }
    req.end();
  });
}

// Test logging
function logTest(testName, status, details) {
  const icon = status === "PASS" ? "✓" : "✗";
  const color = status === "PASS" ? "\x1b[32m" : "\x1b[31m";
  const reset = "\x1b[0m";
  console.log(`${color}${icon} ${testName}${reset}`);
  if (details) {
    console.log(`  Details: ${details}`);
  }
}

async function runTests() {
  console.log("\n=== Pharma Website API Tests ===\n");

  try {
    // Test 1: Admin Login
    console.log("1. Testing Admin Login...");
    const loginPayload = {
      email: "admin@cladianpharma.com",
      password: "admin123",
    };
    console.log('Login payload:', JSON.stringify(loginPayload));
    const loginRes = await makeRequest("POST", "/api/admin/login", loginPayload);
    if (loginRes.status === 200 && loginRes.data.token) {
      adminToken = loginRes.data.token;
      logTest("Admin Login", "PASS", `Token received: ${adminToken.slice(0, 20)}...`);
    } else {
      logTest("Admin Login", "FAIL", `Status: ${loginRes.status}, Response: ${JSON.stringify(loginRes.data)}`);
      console.log("Cannot continue with protected endpoints without admin token\n");
      return;
    }

    // Test 1.5: Get Admin Me
    console.log("\n1.5. Testing Get Admin Me...");
    const meRes = await makeRequest("GET", "/api/admin/me", null, adminToken);
    if (meRes.status === 200 && meRes.data.id && meRes.data.email) {
      logTest("Get Admin Me", "PASS", `Admin: ${meRes.data.email}`);
    } else {
      logTest("Get Admin Me", "FAIL", `Status: ${meRes.status}, Response: ${JSON.stringify(meRes.data)}`);
    }

    // Test 2: Get All Products
    console.log("\n2. Testing Get All Products...");
    const productsRes = await makeRequest("GET", "/api/products");
    if (productsRes.status === 200 && Array.isArray(productsRes.data)) {
      logTest("Get Products", "PASS", `Retrieved ${productsRes.data.length} products`);
    } else {
      logTest("Get Products", "FAIL", `Status: ${productsRes.status}`);
    }

    // Test 3: Search Products
    console.log("\n3. Testing Search Products...");
    const searchRes = await makeRequest("GET", "/api/products/search?q=medicine");
    if (searchRes.status === 200 && Array.isArray(searchRes.data)) {
      logTest("Search Products", "PASS", `Found ${searchRes.data.length} results for 'medicine'`);
    } else {
      logTest("Search Products", "FAIL", `Status: ${searchRes.status}`);
    }

    // Test 4: Create Product (without image)
    console.log("\n4. Testing Create Product...");
    const newProduct = {
      name: "Test Medicine",
      category: "Tablets",
      description: "A test medicine for API testing",
    };
    const createRes = await makeRequest("POST", "/api/products", newProduct, adminToken);
    let productId = null;
    if (createRes.status === 201 && createRes.data._id) {
      productId = createRes.data._id;
      logTest("Create Product", "PASS", `Created product with ID: ${productId}`);
    } else {
      logTest("Create Product", "FAIL", `Status: ${createRes.status}, Response: ${JSON.stringify(createRes.data)}`);
    }

    // Test 5: Update Product (if created successfully)
    if (productId) {
      console.log("\n5. Testing Update Product...");
      const updateRes = await makeRequest(
        "PUT",
        `/api/products/${productId}`,
        {
          name: "Updated Test Medicine",
          category: "Capsules",
          description: "Updated description",
        },
        adminToken
      );
      if (updateRes.status === 200) {
        logTest("Update Product", "PASS", `Updated product ${productId}`);
      } else {
        logTest("Update Product", "FAIL", `Status: ${updateRes.status}`);
      }
    }

    // Test 6: Search with Category Filter
    console.log("\n6. Testing Search with Category Filter...");
    const categorySearchRes = await makeRequest("GET", "/api/products/search?category=Tablets");
    if (categorySearchRes.status === 200 && Array.isArray(categorySearchRes.data)) {
      logTest("Category Search", "PASS", `Found ${categorySearchRes.data.length} products in Tablets category`);
    } else {
      logTest("Category Search", "FAIL", `Status: ${categorySearchRes.status}`);
    }

    // Test 7: Contact Form
    console.log("\n7. Testing Contact Form...");
    const contactRes = await makeRequest("POST", "/api/contact", {
      name: "Test User",
      email: "test@example.com",
      message: "This is a test message",
    });
    if (contactRes.status === 200) {
      logTest("Contact Form", "PASS", "Message sent successfully");
    } else if (contactRes.status === 500 && contactRes.data.msg === "Failed to send email") {
      logTest("Contact Form", "PASS", "Contact route works (email sending skipped - credentials not configured)");
    } else {
      logTest("Contact Form", "FAIL", `Status: ${contactRes.status}, Response: ${JSON.stringify(contactRes.data)}`);
    }

    // Test 8: Change Password
    console.log("\n8. Testing Change Password...");
    const changePassRes = await makeRequest(
      "PUT",
      "/api/admin/change-password",
      {
        currentPassword: "admin123",
        newPassword: "admin123", // Changing to same password to reset
      },
      adminToken
    );
    if (changePassRes.status === 200) {
      logTest("Change Password", "PASS", "Password change successful");
    } else {
      logTest("Change Password", "FAIL", `Status: ${changePassRes.status}, Response: ${JSON.stringify(changePassRes.data)}`);
    }

    // Test 9: Delete Product (if created successfully)
    if (productId) {
      console.log("\n9. Testing Delete Product...");
      const deleteRes = await makeRequest("DELETE", `/api/products/${productId}`, null, adminToken);
      if (deleteRes.status === 200) {
        logTest("Delete Product", "PASS", `Deleted product ${productId}`);
      } else {
        logTest("Delete Product", "FAIL", `Status: ${deleteRes.status}`);
      }
    }

    // Test 10: Unauthorized Access (without token)
    console.log("\n10. Testing Unauthorized Access...");
    const unauthorizedRes = await makeRequest("POST", "/api/products", newProduct); // No token
    if (unauthorizedRes.status !== 201) {
      logTest("Unauthorized Protection", "PASS", `Correctly rejected without token (Status: ${unauthorizedRes.status})`);
    } else {
      logTest("Unauthorized Protection", "FAIL", "Should have been rejected without token");
    }

    console.log("\n=== Tests Complete ===\n");
  } catch (error) {
    console.error("Test execution error:", error);
  }
}

// Run tests
runTests();
