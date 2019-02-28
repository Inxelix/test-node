const express = require('express');

const personal = require('./personal');
const marker = require('./markers');

const router = express.Router();

router.use('/personal', personal);
router.use('/markers', marker);

module.exports = router;
