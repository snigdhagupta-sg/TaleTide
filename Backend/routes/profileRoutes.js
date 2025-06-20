const express = require('express');
const router = express.Router();
const {getProfile} = require('../controllers/getProfileController');
const {editProfile} = require('../controllers/Profile/editProfileController');
router.post('/getProfile', getProfile);
router.post('/editProfile', editProfile);
module.exports = router;