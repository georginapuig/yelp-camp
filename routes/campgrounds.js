const express = require('express');
const router = express.Router();

const Campground = require("../models/campground");
const middleware = require("../middleware");

// INDEX - show all campgrounds
router.get('/', function(req, res) {
  console.log(req.user);
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
router.get('/new', middleware.isLoggedIn, function(req, res) {
  res.render('campgrounds/new');
});

// CREATE - add new campground to db
router.post('/', middleware.isLoggedIn, function(req, res) {
  // get data from form
  const name = req.body.name;
  const price = req.body.price;
  const image = req.body.image;
  const desc = req.body.description; // input name='description'
  const author = {
    id: req.user._id,
    username: req.user.username
  };
  const newCampground = { name: name, price: price, image: image, description: desc, author: author };
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
router.get('/:id', function(req, res) {
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

//  EDIT CAMPGROUND
router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res) {
  Campground.findById(req.params.id, function(err, foundCampground){
    res.render('campgrounds/edit', {campground: foundCampground});
  });
});

// UPDATE CAMPGROUND ROUTE
router.put('/:id', middleware.checkCampgroundOwnership, function(req, res){
  // find and update the correct campground
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
     if(err){
         res.redirect('/campgrounds');
     } else {
         //redirect somewhere(show page)
         res.redirect('/campgrounds/' + req.params.id);
     }
  });
});

// DELETE CAMPGROUND ROUTE
router.delete('/:id', middleware.checkCampgroundOwnership, function(req, res) {
  // destroy blog
  Campground.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.redirect('/campgrounds');
    } else {
      // redirect somewhere
      res.redirect('/campgrounds');
    }
  });
  // res.send('you have reached the destroy route');
});

module.exports = router;