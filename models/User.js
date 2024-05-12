// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String }, 
    isPublic: { type: Boolean, default: true },
    photo: { type: String }, 
    googleId: { type: String } 
});

module.exports = mongoose.model('User', userSchema);
