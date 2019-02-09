const express = require('express');

const { response } = require('../../../constants');
const { User } = require('../../../models');


const router = express.Router();

router
	.get('/checktoken', (req, res) => {
		res.body = response.OK();
		res.send(res.body);
	})

	.put('/addemail', async (req, res) => {
		const { email } = req.body;
		const user = await User.findOne({ _id: res.userID })
		if (!user) {
			res.body = response.NOT_FOUND();
		} else {
			if (user.email) {
				res.body = response.CONFLICT();
			} else {
				await User.updateOne({ _id: res.userID }, { 
					$set: {
						email,
					},
				});
				res.body = response.OK();
			}
		}
		res.send(res.body);
	})

	.delete('/deleteuser', async (req, res) => {
		const user = await User.findOne({ _id: res.userID })
		if (!user) {
			res.body = response.NOT_FOUND();
		} else {
			await User.deleteOne({ _id: res.userID });
			res.body = response.OK();
		};
		res.send(res.body);
	});

module.exports = router;