const Story = require('../models/story');
const Branch = require('../models/branch');

exports.getStory = async (req, res) => {
  try {
    const { story_id } = req.body;

    if (!story_id) {
      return res.status(400).json({ error: 'story_id is required' });
    }

    // 1. Fetch the story by story_id
    const story = await Story.findOne({ story_id });
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }

    // 2. Return story + like count
    res.status(200).json({
      story
    });

  } catch (error) {
    console.error('Error in getStoryController:', error.message);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};
