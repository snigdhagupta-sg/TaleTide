const mongoose = require('mongoose');

const contributionSchema = new mongoose.Schema({
  contribution_id: { type: String, required: true, unique: true },
  story_id: { type: String, required: true },
  parent_id: { type: String },
  contributor_username: { type: String, required: true },
  text: {type:String, required: true},
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Contribution', contributionSchema);