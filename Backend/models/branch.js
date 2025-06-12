const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
  branch_id: { type: String, required: true, unique: true },
  story_id: { type: String, required: true },
  parent_segment_id: { type: String, default: null },
  child_segment_id: { type: String, required: true },
  likes: { type: [String], default: [] }, // store user_ids
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Branch', branchSchema);
