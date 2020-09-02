// npm init 
// git init
// hub create

const PORT = 3300;
const express    = require('express'); // npm install express ejs --save
// in order to get access to the post data we have to use body-parser
// body-parser allows express to read the body and then parse that into a Json object that we can understand  
const app        = express();
const bodyParser = require('body-parser'); // npm install body-parser --save  
const flash = require('connect-flash'); // npm install --save connect-flash
const mongoose   = require('mongoose'); // npm install mongoose --save
const passport    = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride = require('method-override');
// models
const Campground = require('./models/campground');
const Comment    = require('./models/comment');
const User    = require('./models/user');
// seed
const seedDB     = require('./seeds');
// routes
const commentRoutes = require('./routes/comments');
const campgroundRoutes = require('./routes/campgrounds');
const indexRoutes = require('./routes/index');

const url = process.env.DATABASEURL || 'mongodb://localhost:27017/yelp_camp';

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());
console.log(__dirname); // /home/georgina/code/georginapuig/yelp-camp
seedDB();

//  passport config
app.use(require("express-session")({
  secret: "Rusty is the best and cutest dog in the world",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  // add req.user to all templates
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

console.log(process.env.DATABASEURL); // mongodb://localhost:27017/yelp_camp

// mongoose setup
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to DB!'))
  .catch(error => console.log(error.message));

// check db
// 1. use yelp_camp
// 2. show collections
// 3. db.campgrounds.find()

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT || PORT, process.env.IP, function() {
  console.log(`The Yelp camp server has started in port ${PORT}`);
});