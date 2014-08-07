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
	  site = require('./routes/site'),
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
app.use(site);


// SECURITY **********************************
passport.serializeUser(function (user, done){
	done(null, user.id);
});
passport.deserializeUser(function (id, done){
	db.user.find({
		where: {id: id}
	}).complete(function (error, user){
		done(error, user);
	});
});

// PORT **************************************
app.listen(process.env.PORT || 3000, function(){
  console.log("NODEMON RIDING IN THE CODE-VAN localhost:3000");
});

// EXPORT ************************************
module.exports = app;



