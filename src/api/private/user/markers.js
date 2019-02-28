const express = require('express');

const { response } = require('../../../constants');
const { Marker } = require('../../../models');


const router = express.Router();

router

	.post('/markers', async (req, res) => {
		const { latitude, longitude, description, radio } = req.body;
		const newMarker = await Marker.create({ latitude, longitude, description, radio });
		res.body = response.OK();
		res.send(res.body);
	})

	.get('/markers', async (req, res) => {
		const markers = await Marker.find({});
		res.body = response.OK()
		res.body.markers = markers;
		res.send(res.body); 
	})

module.exports = router;