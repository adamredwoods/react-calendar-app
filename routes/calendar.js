require("dotenv").config();
var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var bodyParser = require("body-parser");
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var User = require("../models/user");
var Calendar = require('../models/calendar').Calendar;
var CalEvent = require('../models/calendar').CalEvent;

router.post('/', function(req, res, next){
    console.log(req.body.calendar.id);
    console.log(req.body.user);
    console.log(req.body.user.id);
    console.log(req.query.calendar);
    console.log(req.body.calendarTwo);
    let locationName = req.body.location;
    let allHolidays = [];
    let holidays = req.body.holidays;
    holidays.map((holiday) => {
        let holiName = holiday.name;
        let holiStart = holiday.start;
        let holiEnd = holiday.end;
        let holiType = holiday.type
        var newHoliday = new CalEvent({
            name: holiName,
            startDate: holiStart,
            endDate: holiEnd,
            priority: 0,
            icon: holiName
        });
        holidays.push(newHoliday);
    });

	User.findOne({_id: req.body.user.id}, function(err, user) {
		if(err){
	     	console.log(err);
        }
        Calendar.findOne({_id: req.body.calendar._id, people: {$elemMatch: {userId: req.body.user._id}}}, function(err, calendar){
            if(err){
                console.log(err);
            }
            console.log(calendar);
        });
		// newLocation.userId = user.id;
		// newLocation.save(function(err, location){
		// 	if (err){
		// 		return console.log("save error: " + err);
		// 	}
		// 	console.log("saved",location.name,"to",location.user);
		// 	res.json(location);
		// });
	});
});

router.post('/one', function(req,res,next){
    console.log('add a cal');
});

module.exports = router;