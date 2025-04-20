const router = require("express").Router();
const verifyToken = require("../middleware/authMiddleware");
const User = require("../models/User");

router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...otherData } = user._doc;
    res.status(200).json(otherData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ status: false, message: "Admin access required" });
    const users = await User.find().select("-password").sort({ name: -1 });
    res.status(200).json({ status: true, message: "Users fetched", data: users });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

module.exports = router;