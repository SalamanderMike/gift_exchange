var bcrypt = require('bcrypt'),
		salt = bcrypt.genSaltSync(10), // generate salt(10 chars), but hide this num
		passport = require('passport'),// genSaltSync() is a bcrypt method
		passportLocal = require('passport-local');

module.exports = function Group (sequelize, DataTypes){
	var Group = sequelize.define('group', {
		groupName: {
			type: DataTypes.STRING,
			validate: {len: [6,30]}
		},
		groupID: {
			type: DataTypes.STRING,
			validate: {notEmpty: true}
			},
		spendingLimit: DataTypes.INTEGER,
	  groupTotal: DataTypes.INTEGER,
	  admin: {
  		type: DataTypes.INTEGER,
  		allowNull: false
  		},
		},
		{classMethods: {
			// encryptPass: function(groupID){
			// 	var hash = bcrypt.hashSync(groupID, salt);
			// 	return hash;
			// },
			// comparePass: function(groupPass, dbPass){
			// 	//carefull not to salt twice
			// 	return bcrypt.compareSync(groupPass, dbPass);
			// },
			createNewGroup: function(groupName, groupID, err, success){
				if (groupID.length < 6){// ACK!!! ON ERROR ( add req, above for flash )
				// return done(err, req.flash('signupMessage', 'Ack!!! Password should be more than 6 chars'));
					err({message: 'Password should be more than 6 chars'});
				} else { 
					Group.create({
						groupName: groupName,
						groupID: Group.encryptPass(groupID),
					}).error(function (error){// error = object from Sequelize
						console.log(error);
						if (error.groupName) {
							err({message: 'Your groupName should be 6 chars'});
						} else {
							err({message: 'An account with that groupName already exists'});
						} 
					}).success(function (group){
						success({message: 'Account created!'});
					});
				}
			}
		}
	}); 
  
	// close define('Group')		
	// done(err) // when we screw up
	// done(null, false) // when we do right, group does wrong
	// done(null, group)  // when everyone does right

	// This passport logic can be placed in it's own file and exports/require
// 	passport.use(new passportLocal.Strategy({
// 		usernameField: 'groupName', //groupNameField always remains the key no matter
// 		passwordField: 'groupID',// what you use as the groupName. ie... 'email'
// 		passReqToCallback: true // allows us to use the req param in next line
// 	}, function (req, groupName, groupID, done){
// 		Group.find({
// 			where: {
// 				groupName: groupName 
// 			}
// 		}).complete(function (error, group){
// 			if (error) {
// 				console.log(error);
// 				return done(err, req.flash('loginMessage', 'Ack!!! Something went wrong...'));
// 			}
// 			if (group === null){
// 				console.log(error);
// 				return done(null, false, req.flash('loginMessage', 'Groupname does not exist'));
// 			}
// 			if ((Group.comparePass(groupID, group.groupID)) !== true) {
// 				console.log(error);
// 				return done(null, false, req.flash('loginMessage', 'Invalid Password'));
// 			}
// 			done(null, group);
// 		});
// 	}));

	return Group;
}; 


