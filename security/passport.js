var express = require('express'),
    router = express.Router(),
    User = require('../models/user.js'),
    user = require('../routes/site.js'),
   	passport = require('passport'),
		passportLocal = require('passport-local');



// close define('User')		
// done(err) // when we screw up
// done(null, false) // when we do right, user does wrong
// done(null, user)  // when everyone does right

// This passport logic can be placed in it's own file and exports/require
passport.use(new passportLocal.Strategy({
	usernameField: 'username', //usernameField always remains the key no matter
	passwordField: 'password',// what you use as the username. ie... 'email'
	passReqToCallback: true // allows us to use the req param in next line
}, function (req, username, password, done){
	User.find({
		where: {
			username: username 
		}
	}).complete(function (error, user){
		if (error) {
			console.log(error);
			return done(err, req.flash('loginMessage', 'Ack!!! Something went wrong...'));
		}
		if (user === null){
			console.log(error);
			return done(null, false, req.flash('loginMessage', 'Username does not exist'));
		}
		if ((User.comparePass(password, user.password)) !== true) {
			console.log(error);
			return done(null, false, req.flash('loginMessage', 'Invalid Password'));
		}
		done(null, user);
	});
}));





module.exports = user;

