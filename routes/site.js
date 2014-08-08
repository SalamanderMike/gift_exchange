var express = require('express'),
    router = express.Router(),
   	passport = require('passport'),
		passportLocal = require('passport-local'),
	  db = require('.././models/index.js');


// YELP REQUIRE
var yelp = require("yelp").createClient({
	  consumer_key: "yiiQlfRrSnIM-CjCzlBagQ",
	  consumer_secret: "aU6-q2JI7_CruChDF4EKumSYg4M",
	  token: "UNVzVx-oVevkzMyJPiiCWo4o2ko5-JAU",
	  token_secret: "vbQAHXSwfoZE2vYVCGFfkRU7fQ8"
});
  
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
	if (!req.user){// req.user contains ALL table info of user
		res.redirect('/signup');// so, you could use req.user.id, req.user.firstname
	} else {
		  res.redirect('/home');
	}
});

router.get('/signup', function (req, res) {
	if (!req.user){// req.user contains ALL table info of user
		res.render('signup', {message: undefined});// so, you could use req.user.id, req.user.firstname -, {message: req.flash('signupMessage')}
	} else {
		  res.redirect('/home');
	}
});

router.get('/login', function (req, res) {
	var eMessage = req.flash('loginMessage');
	if (!req.user){
			res.render('login', {message: eMessage});
	} else {
		res.redirect('/home');
	}
});

router.get('/home', function (req, res) {
	if (!req.user){


		res.render('home', {cuisine: cuisine,
												hobbies: hobbies,
												stores: stores,
												books: books,
												clothes: clothes,
												art: art
												});

	} else {
		res.render('/login');
	}
}); 

router.get('/editProfile', function (req, res) {
	if (!req.user){
		res.render('editProfile');
	} else {
		res.render('/login');
	}
}); 

router.get('/settings', function (req, res) {
	if (!req.user){
		res.render('settings');
	} else {
		res.redirect('/home');
	}
});

router.get('/contact', function (req, res) {
	if (!req.user){
		res.render('contact');
	} else {
		res.render('/home');
	}
});

router.get('/about', function (req, res) {
	if (!req.user){
		res.render('about');
	} else {
		res.render('/home');
	}
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
		function (user){
			if (req.body.roll === "createGroup") {
				db.group.createNewGroup(
					req.body.groupName,
					req.body.groupID,
					function (err){
						console.log(error);
					},
					function (group){
						group.addUser(user);
						res.redirect('/settings');
					});
			} else if (req.body.roll === "joinGroup"){
				db.group.find({groupName: req.body.groupName, groupID: db.user.encryptPass(req.body.groupID)})
				.success(function(group){
					console.log(group);
					user.addGroup(group)
					.success(function(){
						res.redirect("/editProfile");
					});
				});

			} else {
				res.redirect('/home');
			}
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
		if (req.body.cuisine[i]){cuisine.push(req.body.cuisine[i]);}
	}
	db.user.update({cuisine: cuisine}).success(function(user){
		res.redirect('/editProfile');
	});
});
router.post('/enterHobbies', function (req, res){
	for (var i = 0; i < 5; i++){
		if (req.body.hobbies[i]){hobbies.push(req.body.hobbies[i]);}
	}
db.user.update({hobbies: hobbies}).success(function(user){
		res.redirect('/editProfile');
	});
});
router.post('/enterStores', function (req, res){
	for (var i = 0; i < 5; i++){
		if (req.body.stores[i]){stores.push(req.body.stores[i]);}
	}
db.user.update({stores: stores}).success(function(user){
		res.redirect('/editProfile');
	});
});
router.post('/enterBooks', function (req, res){
	for (var i = 0; i < 5; i++){
		if (req.body.books[i]){books.push(req.body.books[i]);}
	}
db.user.update({books: books}).success(function(user){
		res.redirect('/editProfile');
	});
});
router.post('/enterClothes', function (req, res){
	for (var i = 0; i < 5; i++){
		if (req.body.clothes[i]){clothes.push(req.body.clothes[i]);}
	}
db.user.update({clothes: clothes}).success(function(user){
		res.redirect('/editProfile');
	});
});
router.post('/enterArt', function (req, res){
	for (var i = 0; i < 5; i++){
		if (req.body.art[i]){art.push(req.body.art[i]);}
	}
db.user.update({art: art}).success(function(user){
		res.redirect('/editProfile');
	});
});
router.post('/enterFavorites', function (req, res){// NOT WORKING *****
	if (req.body.color){color.push(req.body.color);}
	if (req.body.animal){animal.push(req.body.animal);}
	if (req.body.metal){metal.push(req.body.metal);}
	if (req.body.element){element.push(req.body.element);}
});


// YELP! SEARCH
router.get('/search', function (req, res) { 
var queryLocation = req.query.locationsearch || "94115";
var term = req.query.item;
console.log(term);
//name, rating, rating_img_url_small, snippet_image_url, phone, 

yelp.search({term: "ice cream", location: queryLocation,}, function(error, data) {
  if(error){
	    console.log("ACK!!! SOMETHING SMELLS FUNNY IN THIS FUNCTION!");
	    console.log(error);
  }
	  res.render('results', {businesses: data.businesses || [], 
	  isAuthenticated: req.isAuthenticated(),
	  user: req.user,
	  message: ""
	  // JSON.stringify(businesses[0])
	  }); 
	});
});


// finding a group's users
// group.getUsers()




// logout!!! Wipes out cookie data
router.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});



module.exports = router;




