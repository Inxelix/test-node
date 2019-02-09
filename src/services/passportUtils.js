const jwt = require('jsonwebtoken');
const { passport } = require('../constants');


module.exports = {
	buildToken: id => `Bearer ${jwt.sign(
		{
			id,
		},
		passport.JWT_SECRET,
	)}`
};

