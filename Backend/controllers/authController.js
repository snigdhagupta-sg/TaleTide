const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const JWT_SECRET = process.env.JWT_SECRET;

exports.signupUser = async (req, res) => {
  const { name, username, email, password, phone } = req.body;

  try {
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) return res.status(400).json({ error: 'Email or Username already in use' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      user_id: uuidv4(),
      name,
      username,
      email,
      phone,
      password: hashedPassword
    });

    await newUser.save();

    const token = jwt.sign({ user_id: newUser.user_id }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ message: 'Signup successful', token, user: { user_id: newUser.user_id, name: newUser.name, username: newUser.username } });
  } catch (err) {
    res.status(500).json({ error: 'Signup failed', details: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { emailOrUsername, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
    });

    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Incorrect password' });

    const token = jwt.sign({ user_id: user._id }, JWT_SECRET);
    res.status(200).json({ token }); // just send the token (user_id inside it)
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
};

