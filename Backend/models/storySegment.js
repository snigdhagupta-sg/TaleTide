const mongoose = require('mongoose');

const storySegmentSchema = new mongoose.Schema({
  segment_id: { type: String, required: true, unique: true },
  story_id: { type: String, required: true },
  parent_id: { type: String, default: null },
  seq_num: { type: Number, required: true },
  contributor_username: { type: String, required: true },
  type: { type: String, enum: ['text', 'chapter'], default: 'text' },
  text: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('storysegments', storySegmentSchema);