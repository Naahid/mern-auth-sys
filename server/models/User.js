const mongoose = require("mongoose");

// Create Schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

const User = mongoose.model('user', UserSchema);
module.exports = User;