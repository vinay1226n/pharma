const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:5173",
  process.env.ADMIN_FRONTEND_URL || "http://localhost:5174",
  process.env.FRONTEND_ADMIN_URL || "http://localhost:5174",
  process.env.FRONTEND_USER_URL || "http://localhost:5173",
  "http://localhost:5173",
  "http://localhost:5174",
  "https://pharma-navy-omega.vercel.app",
  "https://pharma-wheb.vercel.app"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin || true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'));

// Routes
app.use("/api/admin", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));
app.use("/api/contact", require("./routes/contact"));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Default admin if not exists (run once)
const Admin = require("./models/Admin");
Admin.findOne({ email: "admin@gmail.com" }).then((admin) => {
  if (!admin) {
    Admin.create({
      email: "admin@gmail.com",
      password: "admin123",
    });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
