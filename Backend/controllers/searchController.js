const Story = require('../models/story');

exports.search = async (req, res) => {
  try {
    const { genre, publisher_username, status, sort_by, search } = req.body;

    const matchStage = {};

    if (genre && genre !== 'All') matchStage.genre = genre;
    if (publisher_username && publisher_username !== 'All') matchStage.publisher_username = publisher_username;
    if (status && status !== 'All') matchStage.status = status;
    if (search) {
      matchStage.title = { $regex: search, $options: 'i' };
    }

    const pipeline = [
      { $match: matchStage }
    ];

    if (sort_by === 'Most Liked') {
      pipeline.push(
        {
          $addFields: {
            likes_count: { $size: '$likes' }
          }
        },
        {
          $sort: { likes_count: -1 }
        }
      );
    } else if (sort_by === 'Newest') {
      pipeline.push({ $sort: { created_at: -1 } });
    }

    const stories = await Story.aggregate(pipeline);
    res.status(200).json(stories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
