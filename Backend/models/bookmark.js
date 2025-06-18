const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  bookmark_id: { type: String, required: true, unique: true },
  marker_id: { type: String, required: true }, // user_id who bookmarked
  story_id: { type: String, required: true },
  segment_id: { type: String, required: true },
  start_offset: { type: Number, required: true },
  end_offset: { type: Number, required: true },
  highlighted_text: { type: String, required: true }
});

module.exports = mongoose.model('Bookmark', bookmarkSchema);