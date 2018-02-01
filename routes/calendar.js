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
	User.findOne({_id: req.body.user.id}, function(err, user) {
		if(err){
	     	console.log(err);
        }
        Calendar.findOne({_id: req.body.calendar._id, people: {$elemMatch: {userId: req.body.user.id}}}, function(err, calendar){
            if(err){
                console.log(err);
            }
            if(calendar.people[0].permission === "edit"){
                let holidays = req.body.holidays;
                holidays.map((holiday) => {
                    let holiName = holiday.name;
                    let holiStart = holiday.start;
                    let holiEnd = holiday.end;
                    let holiType = holiday.type
                    if(calendar.events){
                        Calendar.update({ _id: calendar._id }, 
                            { $push: { 
                                events: { 
                                    name: holiName, 
                                    startDate: holiStart, 
                                    endDate: holiEnd, 
                                    priority: 0, 
                                    icon: holiName, 
                                    eventTypeId: 0 
                                }
                            } 
                        }, function(err, newEvent){
                            if(err){
                                console.log(err);
                            }
                        });
                    }else{
                        Calendar.update({ _id: calendar_id }, 
                            { $addToSet: { 
                                events: { 
                                    name: holiName, 
                                    startDate: holiStart, 
                                    endDate: holiEnd, 
                                    priority: 0, 
                                    icon: holiName, 
                                    eventTypeId: 0 
                                } 
                            } 
                        }, function(err, newEvent){
                            if(err){
                                console.log(err);
                                console.log('we don know');
                            }
                        });
                    }
                    console.log('still in the map');
                });
                console.log('finished the map');
            }
        }).then(function(updatedCalendar){
            // res.json({calendar: updatedCalendar});
            // console.log('hi from the new cal');
            // console.log(updatedCalendar);
            Calendar.findOne({_id: updatedCalendar._id}, function(err,calendar){
                if(err){
                    console.log(err);
                    console.log('error in the second cal db call');
                }
                res.json({calendar: calendar});
            });
        });
	});
});

router.post('/one', function(req,res,next){
    console.log('add a cal');
});

module.exports = router;