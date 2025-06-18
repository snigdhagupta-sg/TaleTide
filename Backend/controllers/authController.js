const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const JWT_SECRET = process.env.JWT_SECRET;

exports.signupUser = async (req, res) => {
  const { name, username, email, password, phone } = req.body;

  try {

    // check in db
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) return res.status(400).json({ error: 'Email or Username already in use' });

    // define new user
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

    //store in jwt token
    const token = jwt.sign({ user_id: newUser.user_id, username: newUser.username }, JWT_SECRET, { expiresIn: '30d' });
    res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // only HTTPS in production
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    }).status(201).json({ message: 'Signup successful', user: { user_id: newUser.user_id, name: newUser.name, username: newUser.username } });
  }
  catch (err) {
    res.status(500).json({ error: 'Signup failed', details: err.message });
  }
};



exports.loginUser = async (req, res) => {
  const { emailOrUsername, password } = req.body;

  try {
    // check from db
    // check username/email exits
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    //check password is right
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Incorrect password' });

    // store in jwt token
    const token = jwt.sign({ user_id: user.user_id, username: user.username}, JWT_SECRET, {expiresIn: '30d'});
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // only HTTPS in production
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
      }).status(200).json({ message: 'Login successful', user: { user_id: user.user_id, name: user.name, username: user.username } });
  } 
  catch (err) {
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
};

