const jwt = require('jsonwebtoken');
const User = require('../../models/User');

exports.editProfile = async (req, res) => {
  try {
    // 1. Extract token from cookies
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: 'Unauthorized: No token found' });

    // 2. Verify and extract username
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.user_id;

    // 3. Extract fields from request body
    const { name, username, phone, profile_pic } = req.body;
    const existingUser = await User.findOne({username: username});
    if(existingUser && existingUser.user_id !== user_id) return res.status(409).json({error: "This username is already taken"});

    // 4. Update user document
    const updatedUser = await User.findOneAndUpdate(
      { user_id},
      { $set: {name, username, phone, profile_pic} },
      { new: true, runValidators: true, projection: '-password' }
      // return the updated user document, update only when it stisfies the mongoose format, 
      // exculde the hashed password string from returning to prevent it being leaked
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newToken = jwt.sign({ user_id: updatedUser.user_id, username: updatedUser.username }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.cookie('token', newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });


    // 5. Return updated user
    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });

  } catch (error) {
    console.error('Error in editProfile:', error.message);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};