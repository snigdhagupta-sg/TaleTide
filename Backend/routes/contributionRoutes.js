const express = require('express');
const router = express.Router();
const {makeContribution} = require('../controllers/makeContributionController');
router.post('/makeContribution', makeContribution);
module.exports = router;