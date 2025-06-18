const jwt = require('jsonwebtoken');
const Story = require('../models/story');
const {v4: uuidv4} = require('uuid');

exports.makeStory = async (req, res) => {
        try {
            console.log("Before 1");
            // 1. Get JWT token from cookies
            const token = req.cookies.token;
            if (!token) {
            return res.status(401).json({ error: 'Unauthorized: No token found' });
            }

            // 2. Decode token to get username
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const username = decoded.username;

            // 3. Extract story fields from body
            const {title, genre, status, description } = req.body;
            const story_id = uuidv4();

            // 4. Check required fields
            if (!story_id || !title || !description) {
            return res.status(400).json({ error: 'story_id, title, and description are required' });
            }

            // 5. Create story object
            const newStory = new Story({
            story_id,
            publisher_username: username,
            title,
            genre,
            status,
            description
            });

            // 6. Save to DB
            await newStory.save();

            // 7. Return success response
            res.status(201).json({ message: 'Story created successfully', story: newStory });

        }
        catch (error) {
            console.error('Error in makeStoryController:', error.message);
            res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }
};