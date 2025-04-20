const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    default: ""
  }
}, {
  timestamps: true
});

// Compile the model only once and export it
const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

module.exports = Category;