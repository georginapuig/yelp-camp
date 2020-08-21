const express = require('express');
const router = express.Router({mergeParams: true});

const Campground = require('../models/campground');
const Comment    = require('../models/comment');
const middleware = require("../middleware");

// NEW
router.get('/new', middleware.isLoggedIn, function(req, res) {
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
router.post('/', middleware.isLoggedIn, function(req, res) {
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
router.get('/:comment_id/edit', middleware.checkCommentOwnership, function(req, res) {
  Comment.findById(req.params.comment_id, function(err, foundComment) {
    if (err) {
      res.redirect("back");
    } else {
      res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
    }
  });
});

// UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
     if(err){
         res.redirect("back");
     } else {
         res.redirect("/campgrounds/" + req.params.id );
     }
  });
});

// DESTROY
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
  //findByIdAndRemove
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
     if(err){
         res.redirect("back");
     } else {
         res.redirect("/campgrounds/" + req.params.id);
     }
  });
});

module.exports = router;