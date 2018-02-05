require('dotenv').config();
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var Calendar = require('../models/calendar').Calendar;
var bcrypt = require('bcrypt');
// Used for creating and sending tokens and protecting backend routes
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');


function makeNewCalendar(user, callback) {
   var userCalendar = {};
   Calendar.create({
     name: 'My Calendar',
     userId: user._id,
     eventTypes: [{eventTypeId: 0, name: 'Holiday'},{eventTypeId: 1, name: 'Meeting'},{eventTypeId: 2,name: 'Work'},{eventTypeId:3, name:'Appointment'},{eventTypeId: 4, name: 'Birthday'}],
     people: [{
       userId: user._id,
       permission: 'edit'
     }]
   }, function(err, calendar){
     if (err){
       console.log('Cal DB create error: ', err);
       //res.status(500).send({error: true, message: 'Calendar Database Error - ' + err.message});
       return callback( err, null);
     }

     //--write calendar id back to user
     userCalendar = calendar;
     console.log("makeNewCalendar:",calendar);
     if(user.calendars) {
      //   user.calendars.push({calendarId: calendar._id});
      console.log('did this cal add...from push');
      console.log(userCalendar);
      console.log(userCalendar._id);
         User.update({_id: user.id},{$push: {
           calendars: {calendarId: userCalendar._id}
          }}, function(err,userCalendar){
            if(err){
              console.log(err)
            }
          }); //TODO: return function that return callback with calendar
     } else {
       console.log("did this cal add...from set");
       console.log(userCalendar);
       console.log(userCalendar._id);
      //   user.calendars = [{calendarId: calendar._id}];
         User.update({_id: user.id},{$addToSet: {
           calendars: {calendarId: userCalendar._id}
          }}, function(err,userCalendar){
            if(err){
              console.log(err)
            }
          });
     }
   })
}

function getUserCalendar(user, callback) {
   var userCalendar = {};
   //-- user must always have a calendar[0]
   if(!user.calendars || !user.calendars[0]) {
      makeNewCalendar(user, function(err, calendar) {
         if(err) {
            console.log("db error: could not make new calendar: ",err);
            return callback( err, null);
         } else {
            Calendar.findOne({_id: calendar._id}, function(err, calendar){
               if(err){
                  console.log('DB error - calendar not found: ', err);
                  return callback( err, null);
               }
               //userCalendar = calendar;
               callback(null, calendar);
            });
         }
      });
   } else {
      Calendar.findOne({_id: user.calendars[0].calendarId}, function(err, calendar){
         if(err){
            console.log('DB error - calendar not found: ', err);
            return callback( err, null);
         }
         //userCalendar = calendar;
         callback(null, calendar);
      });

   }
}

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
      getUserCalendar(user, function(err,calendar) {
         // Make a token and return it as JSON
         var token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24 // expires in 24 hours
         });
         res.send({user: user, calendar: calendar, token: token});
      });
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
          makeNewCalendar(user, function(err){
             if (err){
               console.log('DB error: user update: ', err);
               //could send error
               //res.status(500).send({error: true, message: 'Database Error - ' + err.message});
             }
             // make a token & send it as JSON
             var token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
                   expiresIn: 60 * 60 * 24 // expires in 24 hours
                });
                res.send({user: user, calendar: userCalendar, token: token});
             });
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

      getUserCalendar(user, function(err, calendar) {
         if (err) {
            console.log("DB error - getCalendar:",err);
         }
         res.json({
            user: user,
            calendar: calendar,
            token: token
         });
      });
     });
    });
  });

module.exports = router;
