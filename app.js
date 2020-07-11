// npm init 
// git init
// hub create

const express = require('express'); // npm install express ejs --save  
const bodyParser = require('body-parser'); // npm install body-parser --save  
const app = express();
const mongoose = require('mongoose');

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
  image: String
});

// model
const Campground = mongoose.model("Campground", campgroundSchema);

Campground.create(
  {
    name: 'Salmon Creek', 
    image: 'https://images.unsplash.com/photo-1506535995048-638aa1b62b77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80'
  }, function(err, campground) {
    if (err) {
      console.log(err);
    } else {
      console.log("newly created campground");
      console.log(campground);
    }
  }
);

const campgrounds = [
  {name: 'Salmon Creek', image: 'https://images.unsplash.com/photo-1506535995048-638aa1b62b77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80'},
  {name: 'Granite Hill', image: 'https://images.unsplash.com/photo-1550957886-ac45931e5779?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80'},
  {name: 'Mountain Goat\'s Rest', image: 'https://images.unsplash.com/photo-1506535995048-638aa1b62b77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80'},
  {name: 'Salmon Creek', image: 'https://images.unsplash.com/photo-1578145288677-6e6842916b90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80'},
  {name: 'Salmon Creek', image: 'https://images.unsplash.com/photo-1587077742261-7a49f1f3c0c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80'}
];

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// app.get(route, callback)
app.get('/', function(req, res) {
  res.render('landing');
});

app.get('/campgrounds', function(req, res) {
  //                         name       : data
  res.render('campgrounds', {campgrounds: campgrounds});
});

app.post('/campgrounds', function(req, res) {
  // get data from form and add to campgrounds array
  const name = req.body.name;
  const image = req.body.name;
  const newCampground = {name: name, image: image};
  campgrounds.push(newCampground);
  // redirect back to campgrounds page
  // redirect to get by default
  res.redirect('/campgrounds');
});

app.get('/campgrounds/new', function(req, res) {
  res.render('new.ejs');
});

app.listen(process.env.PORT || 3000, process.env.IP, function() {
  console.log('The Yelp camp server has started');
});
