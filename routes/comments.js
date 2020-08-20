const express = require('express');
const router = express.Router({mergeParams: true});

const Campground = require('../models/campground');
const Comment    = require('../models/comment');

// NEW
router.get('/new', isLoggedIn, function(req, res) {
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
router.post('/', isLoggedIn, function(req, res) {
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
          //add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          //save comment
          comment.save();
          // connect new comment to campground
          campground.comments.push(comment);
          campground.save();

          console.log(comment);
          
          // redirect campgound show page 
          res.redirect('/campgrounds/' + campground._id);
        }
      });
    }
  });
});

// EDIT
router.get('/:comment_id/edit', function(req, res) {
  res.render('comments/edit');
});

// MIDDLEWARE
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;