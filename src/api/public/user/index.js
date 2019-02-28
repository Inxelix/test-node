const express = require('express');

const auth = require('./auth');
const markers = require('./markers');

const router = express.Router();

router.use('/auth', auth);
router.use('/markers', markers);

module.exports = router;
