const express = require('express');
const router = express.Router();
const {getFullStory} = require('../controllers/getFullStoryController');
const {getStory} = require('../controllers/getStoryController');
const {getBranchStory} = require('../controllers/getBranchStoryController');
const {makeStory} = require('../controllers/makeStoryController');
const {makeSegment} = require('../controllers/makeSegmentController');
console.log("Welcome to story route!");
router.post('/getFullStory', getFullStory);
router.post('/getStory', getStory);
router.post('/getBranchStory', getBranchStory);
router.post('/makeStory', makeStory);
router.post('/makeSegment', makeSegment);

module.exports = router;