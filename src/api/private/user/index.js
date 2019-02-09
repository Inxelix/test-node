const express = require('express');

const personal = require('./personal');

const router = express.Router();

router.use('/personal', personal);

module.exports = router;
