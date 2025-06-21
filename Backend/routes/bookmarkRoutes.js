const express = require('express');
const router = express.Router();
const {placeBookmark} = require('../controllers/placeBookmarkController');
const {deleteBookmark} = require('../controllers/deleteBookmarkController');
router.post('/place', placeBookmark);
router.post('/delete', deleteBookmark);
module.exports = router;