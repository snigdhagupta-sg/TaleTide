const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true },
  name: { type: String },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  profile_pic: { type: String },
  joined_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
