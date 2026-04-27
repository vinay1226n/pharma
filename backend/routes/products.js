const express = require("express");
const Product = require("../models/Product");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const router = express.Router();

// GET /api/products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// GET /api/products/search?q=term&category=cat
router.get("/search", async (req, res) => {
  try {
    const { q, category } = req.query;
    const query = {};
    if (q)
      query.$or = [
        { name: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ];
    if (category) query.category = category;
    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// GET /api/products/:id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// POST /api/products - protected, upload image
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const { category, name, description } = req.body;
    if (!category || !name || !description) {
      return res.status(400).json({ msg: "Category, name, and description are required" });
    }
    const product = new Product({
      category,
      name,
      description,
      image: req.file ? `/uploads/${req.file.filename}` : "",
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// PUT /api/products/:id - protected
router.put("/:id", auth, upload.single("image"), async (req, res) => {
  try {
    const { category, name, description } = req.body;
    if (!category || !name || !description) {
      return res.status(400).json({ msg: "Category, name, and description are required" });
    }
    const updates = {
      category,
      name,
      description,
    };
    if (req.file) updates.image = `/uploads/${req.file.filename}`;
    const product = await Product.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// DELETE /api/products/:id - protected
router.delete("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json({ msg: "Product deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
