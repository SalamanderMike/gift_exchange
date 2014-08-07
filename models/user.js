var bcrypt = require('bcrypt'),
		salt = bcrypt.genSaltSync(10), // generate salt(10 chars), but hide this num
		passport = require('passport'),// genSaltSync() is a bcrypt method
		passportLocal = require('passport-local');

module.exports = function User (sequelize, DataTypes){
	var User = sequelize.define('user', {
		username: {
			type: DataTypes.STRING,
			unique: true,
			validate: {len: [6,30]}
		},
		password: {
			type: DataTypes.STRING,
			validate: {notEmpty: true}
			},
		firstname: DataTypes.STRING,
		lastname: DataTypes.STRING,
		phone: DataTypes.STRING,
		match: DataTypes.INTEGER,
		cuisine: DataTypes.ARRAY(DataTypes.STRING),
  	hobbies: DataTypes.ARRAY(DataTypes.STRING),
  	stores: DataTypes.ARRAY(DataTypes.STRING),
  	books: DataTypes.ARRAY(DataTypes.STRING),
  	clothes: DataTypes.ARRAY(DataTypes.STRING),
  	art: DataTypes.ARRAY(DataTypes.STRING),
  	color: DataTypes.ARRAY(DataTypes.STRING),
  	animals: DataTypes.ARRAY(DataTypes.STRING),
  	metal: DataTypes.ARRAY(DataTypes.STRING),
  	elements: DataTypes.ARRAY(DataTypes.STRING)
		},		
		{classMethods: {
			encryptPass: function(password){
				var hash = bcrypt.hashSync(password, salt);
				return hash;
			},
			comparePass: function(userPass, dbPass){
				return bcrypt.compareSync(userPass, dbPass);
			},
			createNewUser: function(firstname, lastname, username, password, err, success){
				if (password.length < 6){// ACK!!! ON ERROR ( add req, above for flash )
				// return done(err, req.flash('signupMessage', 'Ack!!! Password should be more than 6 chars'));
					err({message: 'Password should be more than 6 chars'});
				} else { 
					User.create({
						firstname: firstname,
						lastname: lastname,
						username: username,
						password: User.encryptPass(password),
					}).error(function (error){// error = object from Sequelize
						console.log(error);
						if (error.username) {
							err({message: 'Your username should be 6 chars'});
						} else {
							err({message: 'An account with that username already exists'});
						} 
					}).success(function (user){
						success({message: 'Account created!'});
					});
				}
			}
		}
	}); 
  
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

	return User;
}; 


