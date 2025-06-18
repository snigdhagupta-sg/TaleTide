const Story = require('../models/story');
const storySegment = require('../models/storySegment');
const Branch = require('../models/branch');

exports.getFullStory = async (req, res) => {
  const { story_id } = req.body;

  try {
    // 1. Get full story info
    const story = await Story.findOne({ story_id });
    if (!story) return res.status(404).json({ error: 'Story not found' });

    // Prepare result with story metadata
    const result = [{ ...story._doc}];

    // 3. Traverse main path
    let parentId = null;
    let seqNum = 1;

    while (true) {
      // Fetch segments ordered by seq_num for this story and store in array segments
      const segments = await storySegment.find({story_id: story_id}).sort({ seq_num: 1 });
      console.log(segments.length);
      // Filter segments matching current parent and seq
      const nextSegments = segments.filter(
        seg => seg.parent_id === parentId && seg.seq_num === seqNum
      );

      // If no segments found, break and return
      if (nextSegments.length === 0) {
        return res.json(result);
      }

      // If more than one segment => branch point, stop main path
      if (nextSegments.length > 1) {
        // Collect branch segments and their likes
        const branches = await Promise.all(
          nextSegments.map(async seg => {
            const b = await Branch.findOne({story_id, child_segment_id: seg.segment_id });
            const likes = b ? b.likes : [];
            return { ...seg._doc, likes };
          })
        );
        result.push(branches);
        return res.json(result);
      }

      // Exactly one segment => continue main path
      const segment = nextSegments[0];
      result.push({ ...segment._doc});

      // Move to next
      parentId = segment.segment_id;
      seqNum++;
    }
  } 
  catch (err) {
    return res.status(500).json({ error: 'Error fetching story', details: err.message });
  }
};