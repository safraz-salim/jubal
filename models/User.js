const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String },
  location: { type: String },
  password: { type: String, required: true },
  photo: { type: String }, // base64 string
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
