const express = require('express');

const { response } = require('../../../constants');
const { Marker } = require('../../../models');


const router = express.Router();

router

	.post('/markers', async (req, res) => {
		const { location, description, type } = req.body;
		const newMarker = await Marker.create({ location, description, type });
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