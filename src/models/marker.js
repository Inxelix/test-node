const mongoose = require('mongoose');


const markerSchema = new mongoose.Schema({

	location: {
		latitude: Number,
		longitude: Number,
	},

	description: {
		type: String,
		default: '',
	},

	type: {
		type: String,
		default: '',
	},
});

module.exports = mongoose.model('Marker', markerSchema);
