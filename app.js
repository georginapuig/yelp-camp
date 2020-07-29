// npm init 
// git init
// hub create

const express    = require('express'); // npm install express ejs --save
// in order to get access to the post data we have to use body-parser
// body-parser allows express to read the body and then parse that into a Json object that we can understand  
const bodyParser = require('body-parser'); // npm install body-parser --save  
const app        = express();
const mongoose   = require('mongoose'); // npm install mongoose --save
const passport    = require("passport");
const LocalStrategy = require("passport-local");
const Campground = require('./models/campground');
const Comment    = require('./models/comment');
const User    = require('./models/user');
const seedDB     = require('./seeds');

// mongoose setup
mongoose.connect('mongodb://localhost:27017/yelp_camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to DB!'))
  .catch(error => console.log(error.message));

// check db
// 1. use yelp_camp
// 2. show collections
// 3. db.campgrounds.find()

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
console.log(__dirname); // /home/georgina/code/georginapuig/yelp-camp
seedDB();

// app.get(route, callback)
app.get('/', function(req, res) {
  res.render('home');
});

// INDEX - show all campgrounds
app.get('/campgrounds', function(req, res) {
  // get all campgrounds from db
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds/index', {campgrounds: allCampgrounds});
    }
  });
});

// NEW - show form to create new campground
app.get('/campgrounds/new', function(req, res) {
  res.render('campgrounds/new');
});

// CREATE - add new campground to db
app.post('/campgrounds', function(req, res) {
  // get data from form
  const name = req.body.name;
  const image = req.body.image;
  const desc = req.body.description; // input name="description"
  const newCampground = {name: name, image: image, description: desc};
  // create a new campground and save to db
  Campground.create(newCampground, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      // redirect back to campgrounds page
      // redirect to get by default
      res.redirect('/campgrounds');
      console.log(newlyCreated);
    }
  });
});

// SHOW - 
app.get('/campgrounds/:id', function(req, res) {
  // find the campground with provided id
  // Campground.findById('id', callback);
  Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      console.log(foundCampground);
      // render show template with that campground
      res.render('campgrounds/show', {campground: foundCampground});
    }
  });
});

// ==============
// COMMENT ROUTES
// ==============

// NEW
app.get('/campgrounds/:id/comments/new', function(req, res) {
  // find campground by id
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.render('comments/new', { campground: campground });
    }
  });
});

// CREATE
app.post('/campgrounds/:id/comments', function(req, res) {
  // lookup campground using id
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
      res.redirect('/campgrounds');
    } else {
      // create new comment
      Comment.create(req.body.comment, function(err, comment) {
        if (err) {
          console.log(err);
        } else {
          // connect new comment to campground
          campground.comments.push(comment);
          campground.save();
          // redirect campgound show page 
          res.redirect('/campgrounds/' + campground._id);
        }
      });
    }
  });
});

app.listen(process.env.PORT || 3300, process.env.IP, function() {
  console.log('The Yelp camp server has started');
});