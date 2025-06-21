const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const Bookmark = require('../models/bookmark');
const { ConnectionClosedEvent } = require('mongodb');

exports.placeBookmark = async (req, res) => {
  try {
    // 1. Get JWT token from cookies
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No token found' });
    }

    // 2. Decode token to get username
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const marker_id = decoded.user_id; // use this as marker_id
    const { story_id, segment_id, start_offset, end_offset, highlighted_text } = req.body;

    // 3. Validate required fields
    if (!story_id || !segment_id || start_offset == null || end_offset == null || !highlighted_text) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // 4. Create and save the bookmark
    const newBookmark = new Bookmark({
      bookmark_id: uuidv4(),
      marker_id,
      story_id,
      segment_id,
      start_offset,
      end_offset,
      highlighted_text
    });

    await newBookmark.save();

    res.status(201).json({ message: 'Bookmark placed successfully', bookmark: newBookmark });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
