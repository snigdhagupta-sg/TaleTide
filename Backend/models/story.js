const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  story_id: { type: String, required: true, unique: true },
  publisher_username: { type: String, required: true },
  title: { type: String, required: true },
  genre: { type: String },
  status: { type: String, enum: ['ongoing', 'open', 'completed'], default: 'ongoing' },
  description: { type: String, required: true },
  likes: { type: [String], default: [] },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Story', storySchema);
