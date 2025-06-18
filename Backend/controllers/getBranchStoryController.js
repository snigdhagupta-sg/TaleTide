const Story = require('../models/story');
const StorySegment = require('../models/storySegment');
const Branch = require('../models/branch');

exports.getBranchStory = async (req, res) => {
  const { segment_id } = req.body;

  try {
    // 1. Get first segment info
    const segment = await StorySegment.findOne({ segment_id });
    console.log('Segment 1 read');
    if (!segment) return res.status(404).json({ error: 'Branch segment not found' });

    // 2. Get initial like count for this segment
    const rootBranch = await Branch.findOne({ child_segment_id: segment_id });
    const rootLikes = rootBranch ? rootBranch.likes : [];
    console.log('Segment 1 like count read');

    // Prepare result with initial segment and likes
    const result = [{ ...segment._doc, likes: rootLikes }];
    console.log('Segment 1 result prepared');

    // 3. Traverse forward until branch or end
    let parentId = segment_id;
    let seqNum = segment.seq_num + 1;

    while (true) {
      // Fetch child segments of the current parent
      const children = await StorySegment.find({ parent_id: parentId }).sort({ seq_num: 1 });
      console.log('Next segments count: ' + children.length);

      // If no further segments, return accumulated result
      if (children.length === 0) {
        return res.json(result);
      }

      // If multiple children, collect as branches and return
      if (children.length > 1) {
        const branches = await Promise.all(
          children.map(async child => {
            const b = await Branch.findOne({ child_segment_id: child.segment_id });
            const likes = b ? b.likes : [];
            return { ...child._doc, likes };
          })
        );
        result.push(branches);
        return res.json(result);
      }

      // Exactly one child: continue main path
      const nextSeg = children[0];
      const b = await Branch.findOne({ child_segment_id: nextSeg.segment_id });
      result.push({ ...nextSeg._doc});

      // Advance to next segment
      parentId = nextSeg.segment_id;
      seqNum++;
    }
  } 
  catch (err) {
    return res.status(500).json({ error: 'Error fetching branch story', details: err.message });
  }
};