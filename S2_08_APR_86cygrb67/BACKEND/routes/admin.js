const express = require("express");
const router = express.Router();
const User = require("../models/User");
const verifyToken = require("../middleware/authMiddleware");
const Post = require("../models/Post");
const Category = require("../models/Category"); // Import the compiled model

// Rest of the code remains the same
router.get("/users", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ status: false, message: "Admin access required" });
    const users = await User.find().select("-password").sort({ name: -1 });
    res.status(200).json({
      status: true,
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});

// ... (other routes remain unchanged)

module.exports = router;