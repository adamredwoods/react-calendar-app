var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/book-app");

module.exports.User = require("./user.js");
module.exports.Calendar = require("./calendar.js");
