const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const ConnectMongo = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const storyRoutes = require('./routes/storyRoutes');
const profileRoutes = require('./routes/profileRoutes');
const cookieParser = require('cookie-parser');
const contributionRoutes = require('./routes/contributionRoutes');
require('dns').setDefaultResultOrder('ipv4first');


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

ConnectMongo();

app.use('/api/auth', authRoutes);
app.use('/api/story', storyRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/contribution', contributionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
