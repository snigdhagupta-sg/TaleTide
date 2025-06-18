const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    // 1. Extract token from cookies
    const token = req.cookies.token;
    console.log("Profile reading started:")
    if (!token) return res.status(401).json({ error: 'Unauthorized: No token found' });

    // 2. Verify token to get username
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const username = decoded.username;

    // 3. Fetch user from DB by username
    const user = await User.findOne({ username }).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });

    // 4. Return user profile
    res.status(200).json({ user });

  } 
  catch (error) {
    console.error('Error in getProfile:', error.message);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};