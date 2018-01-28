require('dotenv').config();
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var bcrypt = require('bcrypt');
// Used for creating and sending tokens and protecting backend routes
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');

// POST /auth/login route - returns a JWT
router.post('/login', function(req, res, next) {
  console.log('/auth/login post route', req.body);
  var hashedPass = '';
  var passwordMatch = false;
  // look up user
  User.findOne({email: req.body.email}, function(err, user) {
    if(!user || !user.password){
      return res.status(403).send({
        error: true,
        message: 'Invalid User Credentials or Bad Password!'
      });
    }
    // get hashed password from document
    hashedPass = user.password || '';
    // compare passwords
    passwordMatch = bcrypt.compareSync(req.body.password, hashedPass);
    if (passwordMatch) {
      // Make a token and return it as JSON
      var token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
      });
      res.send({user: user, token: token});
    }
    else {
      // Return an error
      res.status(401).send({
        error: true,
        message: 'Invalid Login Credentials. Try Again!'
      });
    }
  });
});


/* POST /auth/signup route */
router.post('/signup', function(req, res, next) {
  console.log('/auth/signup post route', req.body);
  // Find by email
  User.findOne({ email: req.body.email }, function(err, user) {
    if (user) {
      return res.status(400).send({error: true, message: 'Bad Request - User already exists' });
    }
    else {
      // create and save a user
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      }, function(err, user) {
        if (err){
          console.log('DB error', err);
          res.status(500).send({error: true, message: 'Database Error - ' + err.message});
        }
        else {
          // make a token & send it as JSON
          var token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24 // expires in 24 hours
          });
          res.send({user: user, token: token});
        }
      });
    }
  });
});

// This is checked on a browser refresh
router.post('/me/from/token', function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token;
  if (!token) {
    return res.status(401).send({error: true, message: 'You Must Pass a Token!'});
  }

  // get current user from token
  jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
    if (err){
      return res.status(500).send({ error: true, message: 'JWT Verification Error - ' + err});
    }
    //return user using the id from w/in JWT
    User.findById({
      '_id': user._id
    }, function(err, user) {
      if (err){
        console.log('DB error', err);
        return res.status(500).send({error: true, message: 'Database Error - ' + err.message});
      }
      else if(!user){
        console.log('User not found error');
        return res.status(400).json({error: true, message: 'User Not Found!'});
      }
      //Note: you can renew token by creating new token(i.e.
      //refresh it) w/ new expiration time at this point, but I’m
      //passing the old token back.
      var token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
      });
      res.json({
        user: user,
        token: token
      });
    });
  });
});

module.exports = router;
