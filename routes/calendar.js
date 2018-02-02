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
                    let holiEnd = Number(holiday.end.date('U'));
                    console.log('start', holiStart, typeof holiStart);
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
                }else{
                    res.status(500).send({error: true, message: err.message});
                }
            });
        }else{
            res.status(500).send({error: true, message: 'user does not have permission to edit! '+err.message});
        }
    }).then(function(updatedCalendar){
        Calendar.findOne({_id: updatedCaledar._id}, function(err,calendar){
            if(err){
                console.log('err in cal database for add contributor - '+err);
            }
            res.json({calendar: calendar});
        });
    });
});

router.post('/events', function(req,res,next){
    console.log(req.body.startDate);
    console.log(req.body.endDate);
    console.log(req.body.calendar._id);
    console.log(req.body.user.id);
    var start = Number(req.body.startDate.date('U'));
    var end = Number(req.body.endDate.date('U'));
    console.log(start, typeof start);
    console.log(end);
    Calendar.find({
        _id: req.body.calendar._id},{events: {$elemMatch: {"startDate": {
            $gte: start,
            $lte: end
        }}},
    }, function(err,events){
        if(err){
            console.log(err);
        }
        if (events) {
          console.log(events);
        }
        
        res.json({events: events});
    });
});

module.exports = router;