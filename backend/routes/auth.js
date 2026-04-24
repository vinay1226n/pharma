const express = require("express");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const auth = require("../middleware/auth");
const router = express.Router();

// POST /api/admin/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({ token, admin: { id: admin._id, email: admin.email } });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// GET /api/admin/me
router.get("/me", auth, async (req, res) => {
  try {
    res.json({ id: req.admin._id, email: req.admin.email });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// PUT /api/admin/change-password
router.put("/change-password", auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!(await req.admin.comparePassword(currentPassword))) {
      return res.status(400).json({ msg: "Current password incorrect" });
    }
    req.admin.password = newPassword;
    await req.admin.save();
    res.json({ msg: "Password changed" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
