// npm init 
// git init
// hub create

const express = require('express'); // npm install express ejs --save
// in order to get access to the post data we have to use body-parser
// body-parser allows express to read the body and then parse that into a Json object that we can understand  
const bodyParser = require('body-parser'); // npm install body-parser --save  
const app = express();
const mongoose = require('mongoose'); // npm install mongoose --save  

// mongoose setup
mongoose.connect('mongodb://localhost:27017/yelp_camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to DB!'))
  .catch(error => console.log(error.message));

// schema setup
const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

// model
const Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//   {
//     name: 'Granite Hill', 
//     image: 'https://images.unsplash.com/photo-1550957886-ac45931e5779?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
//     description: 'This is a huge Granite Hill, no bathrooms. No water.'
//   }, function(err, campground) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("newly created campground");
//       console.log(campground);
//     }
//   }
// );

// check db
// 1. use yelp_camp
// 2. show collections
// 3. db.campgrounds.find()

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

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
      res.render('index', {campgrounds: allCampgrounds});
    }
  });
});

// CREATE - add new campground to db
app.post('/campgrounds', function(req, res) {
  // get data from form
  const name = req.body.name;
  const image = req.body.name;
  const newCampground = {name: name, image: image};
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

// NEW - show form to create new campground
app.get('/campgrounds/new', function(req, res) {
  res.render('new');
});

// SHOW - 
app.get('/campgrounds/:id', function(req, res) {
  // find the campground with provided id
  // Campground.findById('id', callback);
  Campground.findById(req.params.id, function(err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      // render show template with that campground
      res.render('show', {campground: foundCampground});
    }
  });
});

app.listen(process.env.PORT || 3000, process.env.IP, function() {
  console.log('The Yelp camp server has started');
});
