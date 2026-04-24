const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || 
        process.env.EMAIL_USER.includes("your_") || process.env.EMAIL_PASS.includes("your_")) {
      return res.status(200).json({ msg: "Message received (email not configured)" });
    }
    // Nodemailer transporter (Gmail)
    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // or company email
      subject: `Contact Form - ${name}`,
      html: `
        <p>New contact message:</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    res.json({ msg: "Message sent" });
  } catch (err) {
    console.error(err);
    // Still return 200 because message was received, email sending is optional
    res.status(200).json({ msg: "Message received (email delivery failed)" });
  }
});

module.exports = router;
