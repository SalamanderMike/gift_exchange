var bcrypt = require('bcrypt'),
		salt = bcrypt.genSaltSync(10), // generate salt(10 chars), but hide this num
		passport = require('passport'),// genSaltSync() is a bcrypt method
		passportLocal = require('passport-local');

module.exports = function Profile (sequelize, DataTypes){
	var Profile = sequelize.define('profile', {
		
	})
}