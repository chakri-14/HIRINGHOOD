require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const categoriesRoutes = require("./routes/categories");
const postsRoutes = require("./routes/posts");
const usersRoutes = require("./routes/users");
const path = require("path");
const cors = require("cors"); // Add this line

const app = express();

// Enable CORS for your frontend origin
app.use(cors({
  origin: "http://localhost:5173", // Allow requests from your frontend
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
}));

app.use(express.json());
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "Uploads")));

// Debug: Log the MONGO_URI
console.log('Mongo URI:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

app.listen(process.env.PORT || 5000, () => console.log(`Server running on port ${process.env.PORT || 5000}`));