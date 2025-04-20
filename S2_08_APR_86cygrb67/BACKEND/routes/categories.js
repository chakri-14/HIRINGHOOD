const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const Category = require('../models/Category'); // Import the compiled model
const Post = require("../models/Post");

router.post('/add', verifyToken, async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json({ status: true, message: 'Category created', data: category });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
});

// ... (other routes remain unchanged)

module.exports = router;