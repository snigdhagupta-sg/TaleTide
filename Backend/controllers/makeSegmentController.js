const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const StorySegment = require('../models/storySegment');
const Branch = require('../models/branch');

exports.makeSegment = async (req, res) => {
  try {

    const { story_id, parent_id, text, contributor_username } = req.body;
    if (!story_id || !text || !contributor_username) return res.status(400).json({ error: 'story_id, text and contributor username are required' });

    const segment_id = uuidv4();
    const parentSegment = await StorySegment.findOne({story_id: story_id, segment_id: parent_id});
    if (!parentSegment) return res.status(404).json({ error: 'Parent segment not found' });
    const seq_num_new = 1 + parentSegment.seq_num;
    // 1. Create the new segment
    const newSegment = new StorySegment({
      segment_id,
      story_id,
      parent_id: parent_id || null,
      seq_num: seq_num_new,
      contributor_username,
      type: 'text',
      text
    });
    await newSegment.save();

    // 2. Fetch all segments with same story_id, parent_id, seq_num
    const siblingSegments = await StorySegment.find({
      story_id,
      parent_id: parent_id || null,
      seq_num_new
    });

    // 3. If this is the second segment at this point (branch now exists), create branches for both
    if (siblingSegments.length === 2) {
      for (const seg of siblingSegments) {
        const branch = new Branch({
          story_id,
          parent_id: parent_id || null,
          child_segment_id: seg.segment_id,
          likes: []
        });
        await branch.save();
      }
    }

    // 4. If more than two segments exist now, only add a branch for the newly added one
    else if (siblingSegments.length > 2) {
      const branch = new Branch({
        story_id,
        parent_id: parent_id || null,
        child_segment_id: segment_id,
        likes: []
      });
      await branch.save();
    }

    res.status(201).json({ message: 'Segment created successfully', segment: newSegment });

  } catch (error) {
    console.error('Error in makeSegment:', error.message);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};