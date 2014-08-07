var express = require('express'),
    router = express.Router(),
   	passport = require('passport'),
		passportLocal = require('passport-local'),
	  db = require('../models/index.js');

// GLOBAL VARIABLES
var cuisine = [],
		hobbies = [],
		stores = [],
		books = [],
		clothes = [],
		art = [],
		color = [],
		animal = [],
		metal = [],
		element = [];

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



// FUNCTIONS **************************************
router.post('/createUser', function (req, res){// db.profile.create() is a sequelize method
	db.user.createNewUser(
		req.body.firstname, 
		req.body.lastname, 
		req.body.username, 
		req.body.password, 		
		function (err){
			var eMessage = req.flash('signupMessage');
			res.render('signup', {message: eMessage});
		}, 
		function (success){
			res.redirect('/home');
		});
});

router.post('/login', passport.authenticate('local', {
	successRedirect: '/settings',
	failureRedirect: '/login',
	failureFlash: true
}));


// ENTER PROFILE DATA ***************************
router.post('/enterCuisine', function (req, res){
	for (var i = 0; i < 5; i++){
		if (req.body.cuisine[i]){cuisine.push(req.body.cuisine[i])}
	}
console.log(cuisine);
});
router.post('/enterHobbies', function (req, res){
	for (var i = 0; i < 5; i++){
		if (req.body.hobbies[i]){hobbies.push(req.body.hobbies[i])}
	}
console.log(hobbies);
});
router.post('/enterStores', function (req, res){
	for (var i = 0; i < 5; i++){
		if (req.body.stores[i]){stores.push(req.body.stores[i])}
	}
console.log(stores);
});
router.post('/enterBooks', function (req, res){
	for (var i = 0; i < 5; i++){
		if (req.body.books[i]){books.push(req.body.books[i])}
	}
console.log(books);
});
router.post('/enterClothes', function (req, res){
	for (var i = 0; i < 5; i++){
		if (req.body.clothes[i]){clothes.push(req.body.clothes[i])}
	}
console.log(clothes);
});
router.post('/enterArt', function (req, res){
	for (var i = 0; i < 5; i++){
		if (req.body.art[i]){art.push(req.body.art[i])}
	}
console.log(art);
});
router.post('/enterFavorites', function (req, res){
	if (req.body.color){color.push(req.body.color)}
	if (req.body.animal){animal.push(req.body.animal)}
	if (req.body.metal){metal.push(req.body.metal)}
	if (req.body.element){element.push(req.body.element)}
console.log(element);
});

// PUSH PROFILE DATA TO DATABASE *******************
router.post('/enterData', function (req, res){
	

console.log(element);
});


// finding a user's profile
// user.getProfile()




// logout!!! Wipes out cookie data
router.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});



module.exports = router;




