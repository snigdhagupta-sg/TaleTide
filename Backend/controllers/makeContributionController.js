const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const Contribution = require('../models/contribution');

exports.makeContribution = async (req, res) => {
  try {
    // 1. Get token from cookies
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: 'Unauthorized: No token found' });

    // 2. Decode token to get username
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const contributor_username = decoded.username;

    // 3. Extract story_id and parent_id from body
    const { story_id, parent_id, text } = req.body;
    if (!story_id) {
      return res.status(400).json({ error: 'story_id is required' });
    }

    // 4. Generate contribution ID
    const contribution_id = uuidv4();

    // 5. Create new contribution
    const newContribution = new Contribution({
      contribution_id,
      story_id,
      parent_id,
      contributor_username,
      text
    });

    await newContribution.save();

    // 6. Respond with success
    res.status(201).json({
      message: 'Contribution submitted successfully',
      contribution: newContribution
    });

  } catch (error) {
    console.error('Error in makeContribution:', error.message);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};
