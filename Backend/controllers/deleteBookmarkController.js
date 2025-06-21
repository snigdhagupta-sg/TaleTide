const jwt = require('jsonwebtoken');
const Bookmark = require('../models/bookmark');

exports.deleteBookmark = async (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ error: 'Unauthorized: No token' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const marker_id = decoded.user_id;
    if (!marker_id) return res.status(401).json({ error: 'Unauthorized: Invalid token' });

    const { bookmark_id } = req.body;
    if (!bookmark_id) {
      return res.status(400).json({ error: 'bookmark_id is required' });
    }

    const deleted = await Bookmark.findOneAndDelete({
      bookmark_id,
      marker_id // ensures user only deletes their own bookmark
    });

    if (!deleted) {
      return res.status(404).json({ error: 'Bookmark not found or not authorized' });
    }

    res.status(200).json({ message: 'Bookmark deleted successfully', deleted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
