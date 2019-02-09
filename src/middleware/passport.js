const Passport = require('passport');
const { ExtractJwt, Strategy } = require('passport-jwt');

const { passport } = require('../constants');

const models = require('../models');

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: passport.JWT_SECRET,
	passReqToCallback: true,
};

Passport.use(
	new Strategy(jwtOptions, (req, payload, done) => {
		models[req.model].findOne({ _id: payload.id }, done);
	})
);

module.exports = Passport;