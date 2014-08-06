var express = require('express'),
    router = express.Router(),
   	passport = require('passport'),
		passportLocal = require('passport-local');



router.get('/', function (req, res) {
	// if (!req.user){// req.user contains ALL table info of user
		// res.send('Splash!');
		res.redirect('/signup');// so, you could use req.user.id, req.user.firstname
	// } else {
	// 	  res.redirect('/home');
	// }
});

router.get('/signup', function (req, res) {
	// if (!req.user){// req.user contains ALL table info of user
		res.render('signup', {message: undefined});// so, you could use req.user.id, req.user.firstname -, {message: req.flash('signupMessage')}
	// } else {
	// 	  res.redirect('/home');
	// }
});

router.get('/login', function (req, res) {
	var eMessage = req.flash('loginMessage');
	// if (!req.user){
			res.render('login', {message: eMessage});
	// } else {
	// 	res.redirect('/home');
	// }
});

router.get('/home', function (req, res) {
	// if (!req.user){

		res.render('home');
// 	} else {
// 		res.render('/login');
// 	}
}); 

router.get('/editProfile', function (req, res) {
	// if (!req.user){
		res.render('editProfile');
// 	} else {
// 		res.render('/login');
// 	}
}); 

router.get('/settings', function (req, res) {
	// if (!req.user){
		res.render('settings');


	// } else {
	// 	res.redirect('/home');
	// }
});

router.get('/contact', function (req, res) {
	// if (!req.user){
		res.render('contact');
	// } else {
	// 	res.render('/home');
	// }
});

router.get('/about', function (req, res) {
	// if (!req.user){
		res.render('about');
	// } else {
	// 	res.render('/home');
	// }
});



// functions
router.post('/createUser', function (req, res){
	db.user.createNewUser(
		req.body.firstname, 
		req.body.lastname, 
		req.body.username, 
		req.body.password, 		
		req.body.roll, 
		req.body.groupName, 
		req.body.groupPassword, 

// ask instructor about enabling flash here -, {message: req.flash('signupMessage')}
		function (err){
			var eMessage = req.flash('signupMessage');
			res.render('signup', {message: eMessage});
		}, 
		function (success){
			res.redirect('/home');
		});
});

router.post('/login', passport.authenticate('local',{ //function (req, res){
	successRedirect: '/settings',

	// function(req){
	// 	console.log(req.user.admin)
	// 	if (req.user.admin === true){
	// 		res.render('settings', {message: req.flash('loginMessage')});
	// 	} else {
	// 		res.render('login', {message: req.flash('loginMessage')});
	// 	}
	// },

	failureRedirect: '/login',
	failureFlash: true
}));


router.post('/enterData', function (req, res){
	var foods = [];
	for (var i = 0; i < 5; i++){
		foods.push(req.body.cuisine[i]);
		
	}


})









// logout!!! Wipes out cookie data
router.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});



module.exports = router;




