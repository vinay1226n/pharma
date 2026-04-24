const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Admin = require("./models/Admin");
const Product = require("./models/Product");
const AdminDetails = require("./models/AdminDetails");
const bcrypt = require("bcryptjs");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)

  .then(async () => {
    console.log("Connected to MongoDB for seeding");

    // Clear existing data
    await Admin.deleteMany({});
    await Product.deleteMany({});
    await AdminDetails.deleteMany({});

    // Create default admin
    const hashedPassword = bcrypt.hashSync("admin123", 10);
    const admin = await Admin.create({
      email: "admin@cladianpharma.com",
      password: hashedPassword,
    });

    // Create admin details
    await AdminDetails.create({
      adminId: admin._id,
      firstName: "Vinay",
      lastName: "Kumar",
      company: "Cladian Pharma",
      email: "admin@cladianpharma.com",
      phone: "+91-9876543210",
      address: "123 Pharma Street",
      city: "Bangalore",
      state: "Karnataka",
      zipCode: "560001",
      country: "India",
      profileImage: "",
      lastLogin: new Date(),
    });

    // Seed sample products
    await Product.insertMany([
      {
        category: "Antibiotics",
        name: "Amoxicillin",
        description: "Broad spectrum antibiotic for bacterial infections",
        image: "/uploads/sample1.jpg",
      },
      {
        category: "Pain Relief",
        name: "Paracetamol",
        description: "Analgesic and antipyretic medication for pain and fever",
        image: "/uploads/sample2.jpg",
      },
      {
        category: "Vitamins",
        name: "Vitamin D3",
        description: "Essential vitamin for bone health and immunity",
        image: "/uploads/sample3.jpg",
      },
      {
        category: "Antibiotics",
        name: "Ciprofloxacin",
        description: "Fluoroquinolone antibiotic for various infections",
        image: "/uploads/sample4.jpg",
      },
      {
        category: "Cough & Cold",
        name: "Cough Syrup",
        description: "Effective relief from dry and wet cough",
        image: "/uploads/sample5.jpg",
      },
      {
        category: "Digestive Care",
        name: "Omeprazole",
        description: "Proton pump inhibitor for acid reflux and ulcers",
        image: "/uploads/sample6.jpg",
      },
      {
        category: "Pain Relief",
        name: "Ibuprofen",
        description: "NSAID for pain relief and inflammation",
        image: "/uploads/sample7.jpg",
      },
      {
        category: "Vitamins",
        name: "Vitamin B Complex",
        description: "Complete B vitamins for energy and metabolism",
        image: "/uploads/sample8.jpg",
      },
      {
        category: "Skin Care",
        name: "Hydrocortisone Cream",
        description: "Topical steroid for skin inflammation and itching",
        image: "/uploads/sample9.jpg",
      },
      {
        category: "Cold & Flu",
        name: "Antihistamine Tablet",
        description: "Relief from allergies and cold symptoms",
        image: "/uploads/sample10.jpg",
      },
      {
        category: "Minerals",
        name: "Iron Supplement",
        description: "Iron oxide for treating anemia and iron deficiency",
        image: "/uploads/sample11.jpg",
      },
      {
        category: "Digestive Care",
        name: "Antacid Tablets",
        description: "Quick relief from acidity and heartburn",
        image: "/uploads/sample12.jpg",
      },
    ]);

    console.log("✓ Seeding complete!");
    console.log("═══════════════════════════════════════");
    console.log("Admin Account Created:");
    console.log("  Email: admin@cladianpharma.com");
    console.log("  Password: admin123");
    console.log("═══════════════════════════════════════");
    console.log("Admin Details Added:");
    console.log("  Name: Vinay Kumar");
    console.log("  Phone: +91-9876543210");
    console.log("  City: Bangalore");
    console.log("═══════════════════════════════════════");
    console.log("✓ 12 Sample Products Seeded");
    console.log("✓ Database Ready for Testing");
    console.log("═══════════════════════════════════════");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Seeding error:", err);
    process.exit(1);
  });
