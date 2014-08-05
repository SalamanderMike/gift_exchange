// Gift Exchange Web App
var express = require('express'),
  bodyParser = require('body-parser'),
  passport = require('passport'),
	passportLocal = require('passport-local'),// stores password locally
	cookieParser = require('cookie-parser'),
	cookieSession = require('cookie-session'),
	flash = require('connect-flash'),
  methodOverride = require('method-override'),
  db = require('./models/index.js'),
  pg = require('pg'),
  app = express();
 
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(cookieSession({secret: 'thisismysecretkey', // hide in config var
											name: 'cookie created by Mike', 
											maxage: 360000})); // cookie expires in milliseconds
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// prepare our serialize at login. 
passport.serializeUser(function (user, done){
	// console.log("SERIALIZED");
	done(null, user.id);
});
// Authorization. Passport automatically sends this on each (req,res)
passport.deserializeUser(function (id, done){// req.logout();
	// console.log("DESERIALIZED");
	db.user.find({
		where: {
			id: id
		}
	}).complete(function (error, user){
		done(error, user);// .then either (error) out or send (user) on their way
	});
});





// PAGES
app.get('/', function (req, res) {
	// if (!req.user){// req.user contains ALL table info of user
		res.redirect('/signup');// so, you could use req.user.id, req.user.firstname
	// } else {
	// 	  res.redirect('/home');
	// }
});

app.get('/signup', function (req, res) {
	// if (!req.user){// req.user contains ALL table info of user
		res.render('signup');// so, you could use req.user.id, req.user.firstname -, {message: req.flash('signupMessage')}
	// } else {
	// 	  res.redirect('/home');
	// }
});

app.get('/login', function (req, res) {
	// if (!req.user){
		res.render('login', {message: req.flash('loginMessage')});
	// } else {
	// 	res.redirect('/home');
	// }
});

app.get('/home', function (req, res) {
	// if (!req.user){
		res.render('home', {message: req.flash('loginMessage')});
// 	} else {
// 		res.render('/login');
// 	}
}); 

app.get('/settings', function (req, res) {
	// if (!req.user){
		res.render('settings', {message: req.flash('settingsMessage')});

		
	// } else {
	// 	res.redirect('/home');
	// }
});

app.get('/contact', function (req, res) {
	// if (!req.user){
		res.render('contact', {message: req.flash('loginMessage')});
	// } else {
	// 	res.render('/home');
	// }
});

app.get('/about', function (req, res) {
	// if (!req.user){
		res.render('about', {message: req.flash('loginMessage')});
	// } else {
	// 	res.render('/home');
	// }
});



// functions
app.post('/createUser', function (req, res){
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
			res.render('signup');
		}, 
		function (success){
			res.redirect('/home', {message: success.message});
		});
});

app.post('/login', passport.authenticate('local', {
	successRedirect: '/home',
	failureRedirect: '/login',
	failureFlash: true
}));












// logout!!! Wipes out cookie data
app.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});


app.listen(3000, function(){
  console.log("NODEMON RIDING IN THE CODE-VAN localhost:3000");
});

