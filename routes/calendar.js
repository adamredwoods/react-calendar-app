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
var Mongoose = require("mongoose");
require('date-format-lite');

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
                    let holiStart = Number(holiday.start.date('U'));
                    let startTime = holiday.start.date("HH:MM");
                    let holiEnd = Number(holiday.end.date('U'));
                    let endTime = holiday.end.date("HH:MM");
                    console.log('start', holiStart, typeof holiStart);
                    let holiType = holiday.type
                    if(calendar.events){
                        Calendar.update({ _id: calendar._id },
                            { $push: {
                                events: {
                                    name: holiName,
                                    startDate: holiEnd,
                                    startTime: startTime,
                                    endDate: holiEnd,
                                    endTime: endTime,
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
                                    startDate: holiEnd,
                                    startTime: startTime,
                                    endDate: holiEnd,
                                    endTime: endTime,
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

router.post('/edit', function(req,res,next){
    Calendar.findOne({_id: req.body.calendar._id, people: {$elemMatch: {userId: req.body.user.id}}}, function(err, calendar){
        if(err){
            console.log(err);
        }
        if(calendar.people[0].permission === 'edit'){
            var newContributor = {};
            User.findOne({email: req.body.email}, function(err,contributor){
                if(err){
                    res.status(500).send({error: true, message: 'user does not have an account yet! '+err.message});
                }
                newContributor = contributor;
                if(newContributor._id){
                    Calendar.update({_id: calendar._id},{$push:{people:{userId:newContributor._id, permission:req.body.permission}}, name: req.body.name},function(err,newContributor){
                        if(err){
                            console.log(err);
                        }
                    });
                    res.json({newContributor: newContributor});
                }else{
                    res.status(500).send({error: true, message: err.message});
                }
            });
        }else{
            res.status(500).send({error: true, message: 'user does not have permission to edit! '+err.message});
        }
    });
});

router.post('/events', function(req,res,next){
    console.log(req.body.calendar._id);
    var start = Number(req.body.startDate.date('U'));
    var end = Number(req.body.endDate.date('U'));
    Calendar.aggregate([
        {$match: {_id: Mongoose.Types.ObjectId(req.body.calendar._id)}},
        {$unwind: "$events"},
		  {"$match":{"events.startDate":{$gte: start, $lte: end}}}
	  ], function(err, events) {
			  if(err){
		         console.log(err);
		     }
		     if (events) {
		       console.log(events);
				 res.json({events: events});
		     }
		  });
});

router.post('/one', function(req,res,next){
	console.log("/one");
    console.log(req.body);
    User.findOne({_id: req.body.user.id},function(err,user){
        if(err){
            console.log(err);
        }
        Calendar.findOne({_id: req.body.calendar._id, userId: req.body.user.id},function(err,calendar){
            if(err){
                console.log(err);
            }
            let name = req.body.name;
            let startDate = Number(req.body.startDate.date('U'));
            let startTime = req.body.startTime;
            let endDate = Number(req.body.endDate.date('U'));
            let endTime = req.body.endTime;
            let eventType = req.body.eventType;
            let priority = req.body.priority;
            if(calendar.events){
                Calendar.update({ _id: calendar._id },
                    { $push: {
                        events: {
                            name: name,
                            startDate: startDate,
                            startTime: startTime,
                            endDate: endDate,
                            endTime: endTime,
                            priority: priority,
                            icon: name,
                            eventTypeId: eventType
                        }
                    }
                    }, function(err, newEvent){
                        if(err){
                            console.log(err);
                        }
                        res.json({event: newEvent});
                    }
                );
            }else{
                Calendar.update({ _id: calendar_id },
                    { $addToSet: {
                        events: {
                            name: name,
                            startDate: startDate,
                            startTime: startTime,
                            endDate: endDate,
                            endTime: endTime,
                            priority: priority,
                            icon: holiName,
                            eventTypeId: eventType
                        }
                    }
                    }, function(err, newEvent){
                        if(err){
                            console.log(err);
                            console.log('we don know');
                        }
                        res.json({event: newEvent});
                    }
                );
            }
        });
	});
});

router.post("/editone", function(req, res, next) {
  console.log("delete");
  console.log(req.body);
//   let eventId = req.body.eventId;
//   console.log(eventId);
//   let name = req.body.name;
//   let startDate = req.body.startDate;
//   console.log("is in year-month-day");
//   let startTime = req.body.startTime;
//   let endTime = req.body.endTime;
//   let endDate = req.body.endDate;
//   let eventType = req.body.eventType;
//   let priority = req.body.priority;
//   console.log("user - ", req.body.user.id);
//   console.log("cal id - ", req.body.calendarId);
//   Calendar.findOne({ _id: req.body.calendarId }, function(err, calendar) {
//     if (err) {
//       console.log(err);
//     }
//     if (calendar.people) {
//       for (let i = 0; i < people.length; i++) {
//         if (
//           people[i].userId == req.body.user.id &&
//           people[i].permission == "edit"
//         ) {
//           // Calendar.update({_id: req.body.calendar._id, events: {$elemMatch:{}}})
//           console.log("edit perms");
//         }
//       }
//     } else {
//       console.log("no edit perms");
//     }
//   });
});

router.post('/event/delete',function(req,res,next){
    console.log('edit');
    console.log(req.body);
});

module.exports = router;
