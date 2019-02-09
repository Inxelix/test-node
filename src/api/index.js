const express = require('express');

const publicRoutes = require('./public');
const privateRoutes = require('./private');
const { validateToken } = require('../middleware');

const router = express.Router();

router.use('/public', publicRoutes);
router.use('/private/:model', (req, res, next) => {
		const { model } = req.params;
		req.model = model.charAt(0).toUpperCase() + model.slice(1);
		next();
	},
	validateToken,
);
router.use('/private', privateRoutes);

module.exports = router;