const express = require('express');

const { response } = require('../../../constants');
const { User } = require('../../../models');
const { passportUtils } = require('../../../services');


const router = express.Router();

router
	.get('/test', (req, res) => {
		res.body = response.OK();
		res.body.test = 'hello world!';
		res.send(res.body);
	})

	.post('/reg', async (req, res) => {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		if (user) {
			res.body = response.CONFLICT();
		} else {
			const newUser = await User.create({ username, password });
			res.body = response.OK();
			res.body.token = passportUtils.buildToken(user._id);
		}
		res.send(res.body);
	})

	.post('/login', async (req, res) => {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		if (!user) {
			res.body = response.NOT_FOUND();
		} else {
			if (user.checkPassword(password)) {
				res.body = response.OK();
				res.body.token = passportUtils.buildToken(user._id);
			} else {
				res.body = response.CONFLICT();
			}
		}
		res.send(res.body);
	})

module.exports = router;