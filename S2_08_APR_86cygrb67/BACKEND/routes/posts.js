const router = require("express").Router();
const verifyToken = require("../middleware/authMiddleware");
const Post = require("../models/Post");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });
const Category = require("../models/Category"); // Import the compiled model

// Rest of the code remains the same
router.post("/create", verifyToken, async (req, res) => {
  try {
    const currentUser = req.user.id;
    const { title, content, category } = req.body;
    if (!title || !content) {
      return res.status(400).json({
        status: false,
        message: "Please fill all fields",
      });
    }
    const postTitle = await Post.find({ title });
    if (postTitle.length > 0) {
      return res.status(400).json({
        status: false,
        message: "Post title already exists",
      });
    }
    const newPost = new Post({
      title: title,
      content: content,
      author: currentUser,
      category: category,
    });
    await newPost.save();
    res.status(201).json({
      status: true,
      message: "Post added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
});

// ... (other routes remain unchanged)

module.exports = router;