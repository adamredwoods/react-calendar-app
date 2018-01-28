var passport = require('passport'); // maybe should pass this in? works anyway
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var User = require('../models/user');

/*
 * Passport "serializes" objects to make them easy to store, converting the
 * user to an identifier (id)
 */
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

/*
 * Passport "deserializes" objects by taking the user's serialization (id)
 * and looking it up in the database
 */
passport.deserializeUser(function(id, cb) {
  User.find({ id: id }, function(err, user) {
    cb(null, user);
  });
});

/*
 * This is Passport's strategy to provide local authentication. We provide the
 * following information to the LocalStrategy:
 *
 * Configuration: An object of data to identify our authentication fields, the
 * username and password
 *
 * Callback function: A function that's called to log the user in. We can pass
 * the email and password to a database query, and return the appropriate
 * information in the callback. Think of "cb" as a function that'll later look
 * like this:
 *
 * login(error, user) {
 *   // do stuff
 * }
 *
 * We need to provide the error as the first argument, and the user as the
 * second argument. We can provide "null" if there's no error, or "false" if
 * there's no user.
 */
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(email, password, cb) {
  var hashedPass = '';
  var passwordMatch = false;
  // look up user
  User.findOne({email: email}, function(err, user) {
    // get hashed password from db
    hashedPass = user.password;
    // compare passwords
    passwordMatch = bcrypt.compareSync(password, hashedPass);
    if (passwordMatch) {
      console.log("passwords match");
      cb(null, user);
    } else {
      console.log("passwords don't match");
      cb(null, false);
    }
  })
}));

// export the Passport configuration from this module
module.exports = passport;
