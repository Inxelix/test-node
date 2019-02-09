const mongoose = require('mongoose');
const uuid = require('uuid');
const crypto = require('crypto');


const userSchema = new mongoose.Schema({
	_id: {
		type: String,
		default: uuid,
	},

	username: {
		type: String,
		default: 'user',
	},

	email: {
		type: String,
		default: '',
	},

	passwordHash: String,

	salt: String,
});

userSchema
	.virtual('password')
	.set(function setPassword(password) {
		this._plainPassword = password;
		if (password) {
			this.salt = crypto.randomBytes(128).toString('base64');
			this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1');
		} else {
			this.salt = undefined;
			this.passwordHash = undefined;
		}
	})
	.get(function getPassword() {
		return this._plainPassword;
	});

userSchema.methods.checkPassword = function checkPassword(password) {
	return password && this.passwordHash 
		? crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1').toString() === this.passwordHash
		: false; 
};

module.exports = mongoose.model('User', userSchema);
