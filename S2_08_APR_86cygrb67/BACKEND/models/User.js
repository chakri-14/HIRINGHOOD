const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    role: {
        type: String,
        enum: ["admin", "editor", "user"],
        default: "user"
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;