const mongoose = require("mongoose");
const Admin = require("./models/Admin");
require("dotenv").config();

async function resetAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Delete existing admin
    await Admin.deleteOne({ email: "admin@gmail.com" });
    console.log("Deleted existing admin");

    // Create new admin with correct password
    const admin = await Admin.create({
      email: "admin@gmail.com",
      password: "admin123",
    });
    console.log("Created new admin successfully");
    console.log("Email: admin@gmail.com");
    console.log("Password: admin123");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

resetAdmin();
