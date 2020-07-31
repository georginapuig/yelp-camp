const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require("../models/user");

// router.get(route, callback)
router.get('/', function(req, res) {
  res.render('home');
});

// SIGN UP ROUTES

// show register form
router.get('/register', function(req, res) {
  res.render('register');
});

// handling sign up logic
router.post('/register', function(req, res) {
  const newUser = new User({username: req.body.username});

  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.render('register');
    } else {
      passport.authenticate('local')(req, res, function() {
        res.redirect('/campgrounds');
      });
    }
  });
});

// LOGIN ROUTES

// render login form
router.get('/login', function(req, res) {
  res.render('login');
});

// login logic
// router.post('/login', middleware. calback)
router.post('/login', passport.authenticate('local', 
  {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
  }), function(req, res) {
});

// LOGOUT ROUTE
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/campgrounds');
});

// MIDDLEWARE
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;