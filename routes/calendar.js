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
// var CalEvent = require('../models/calendar').CalEvent;
var Mongoose = require("mongoose");
require('date-format-lite');

router.post('/all', function(req,res,next){
    console.log(req.body);
    User.aggregate([
        {$match: {_id: Mongoose.Types.ObjectId(req.body.user.id)}},
        {$unwind: "$calendars"},
	  ], function(err, calendars) {
			  if(err){
		         console.log(err);
		     }
		     if (calendars) {
                // console.log(calendars);
                let allCalendars = [];
                for(let i=0;i<calendars.length;i++){
                    let allPeople = [];
                    Calendar.findOne({_id: calendars[i].calendars.calendarId},function(err,calendar){
                        if(err){
                            console.log(err)
                        }
                        if(calendar.people){
                            for(let i=0; i<calendar.people.length; i++){
                                let email;
                                User.findOne({_id: calendar.people[i].userId},function(err,user){
                                    if(err){
                                        console.log(err);
                                    }
                                    email = user.email;
                                    let person = {email: email, permission: calendar.people[i].permission};
                                    allPeople.push(person);
                                    console.log(allPeople);
                                });
                            }
                            console.log(allPeople);
                        }
                    });
                    // console.log(allPeople);
                    // allCalendars.push({
                    //     _id: calendars[i].calendars.calendarId
                    // })
                }
            //    res.json({calendars: calendars});
		     }
		  });
});

router.post('/add', function(req,res,next){
    var userCalendar = {};
    Calendar.create({
        name: req.body.name,
        userId: req.body.user.id,
        eventTypes: [{eventTypeId: 0, name: 'Holiday'},{eventTypeId: 1, name: 'Meeting'},{eventTypeId: 2,name: 'Work'},{eventTypeId:3, name:'Appointment'},{eventTypeId: 4, name: 'Birthday'}],
        people: [{
            userId: req.body.user.id,
            permission: 'edit'
        }]
    }, function(err, calendar){
        if (err){
            console.log('Cal DB create error: ', err);
        }
        userCalendar = calendar;
        console.log("makeNewCalendar:",calendar);
        User.findOne({_id: req.body.user.id},function(err,user){
            if(user.calendars) {
                User.update({_id: req.body.user.id},{$push: {
                    calendars: {calendarId: userCalendar._id}
                }}, function(err,userCalendar){
                    if(err){
                        console.log(err)
                    }
                }); 
            } else {
                console.log("did this cal add...from set");
                User.update({_id: req.body.user.id},{$addToSet: {
                    calendars: {calendarId: userCalendar._id}
                }}, function(err,userCalendar){
                    if(err){
                        console.log(err)
                    }
                });
            }
        });
    });
});

router.post('/addHoliday', function(req, res, next){
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
    Calendar.findOne({_id: req.body.calendarId}, function(err, calendar){
        if(err){
            console.log(err);
        }
        if(calendar.userId == req.body.user.id){
            var newContributor = {};
            User.findOne({email: req.body.email}, function(err,contributor){
                newContributor = contributor;
                if(newContributor._id){
                    if(calendar.people){
                        Calendar.update({_id: calendar._id},{
                            $push:
                                {people:{userId:newContributor._id, permission:req.body.permission}}
                        },function(err,newPerson){
                            if(err){
                                console.log(err)
                            }
                            console.log(newPerson);
                        });
                    }else{
                        Calendar.update({_id: calendar._id},{
                            $addToSet:
                                {people:{userId:newContributor._id, permission:req.body.permission}}
                        },function(err,newPerson){
                            if(err){
                                console.log(err)
                            }
                            console.log(newPerson);
                        });
                    }
                    User.update({email: req.body.email},{$push:{calendars:{calendarId: req.body.calendarId}}},function(err,updatedUser){
                        if(err){
                            console.log(err);
                        }
                        console.log(updatedUser);
                    });
                }
            });
        }
        if(calendar.people){
            for(let i=0; i<calendar.people.length; i++){
                if(calendar.people[i].userId == req.body.user.id && calendar.people[i].permission == 'edit'){
                    var newContributor = {};
                    User.findOne({email: req.body.email}, function(err,contributor){
                        if(err){
                            res.status(500).send({error: true, message: 'user does not have an account yet! '+err.message});
                        }
                        newContributor = contributor;
                        if(newContributor._id){
                            Calendar.update({_id: calendar._id},{$push:{people:{userId:newContributor._id, permission:req.body.permission}}},function(err,newContributor){
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
                    res.status(500).send({error: true, message: error.message});
                }
            }
        }else{
            res.status(500).send({error: true, message: 'user does not have permission to edit! '+err.message});
        }
    });
});

router.post('/editName', function(req,res,next){
    Calendar.findOne({_id: req.body.calendar},function(err,calendar){
        if(err){
            console.log(err);
        }
        if(calendar.userId == req.body.user.id){
            Calendar.update({_id: req.body.calendar},{$set: {name: req.body.name}},function(err,updatedCalendar){
                if(err){
                    console.log(err);
                }
                res.json({updatedCalendar: updatedCalendar});
            })
        }else if(calendar.people){
            for(let i=0; i<calendar.people.length; i++){
                if(calendar.people[i].userId == req.body.user.id && calendar.people[i].permission == 'edit'){
                    Calendar.update({_id: req.body.calendar},{$set:{name: req.body.name}},function(err,updatedCalendar){
                        if(err){
                            console.log(err);
                        }
                        res.json({updatedCalendar: updatedCalendar});
                    });
                }
            }
        }else{
            res.status(500).send({error: true, message: 'you do not have edit permissions! '+error.message});
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
    Calendar.findOne({_id: req.body.calendar._id},function(err,calendar){
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
        if(calendar.userId == req.body.user.id){
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
        }else if(calendar.people){
            for(let i=0;i<calendar.people.length; i++){
                if(calendar.people[i].userId == req.body.user.id && calendar.people[i].permission == 'edit'){
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
                }
            }
        }else{
            res.status(500).send({error: true, message: 'you do not have edit permissions, please talk to the calendar owner - '+error.message});
        }
	});
});

router.post('/editone', function(req, res, next) {
  console.log("delete");
  console.log(req.body);
  let editEventId = req.body.eventObj._id;
  let eventName = req.body.eventObj.eventName;
  let startDate = Number(req.body.eventObj.startDate.date('U'));
  let startTime = req.body.eventObj.startTime;
  let endDate = Number(req.body.eventObj.endDate.date('U'));
  let endTime = req.body.eventObj.endTime;
  let priority = req.body.eventObj.priority;
  let eventType = req.body.eventObj.eventType;
  Calendar.findOne({_id: req.body.calendarId},function(err, calendar){
      if(err){
          console.log(err);
      }
      if(calendar){
          if(calendar.userId == req.body.user.id){
              Calendar.findOneAndUpdate({"_id": req.body.calendarId, "events._id": editEventId
                        },{
                            "$set":{
                                "events.$.name": eventName,
                                "events.$.eventTypeId": eventType,
                                "events.$.startDate": startDate,
                                "events.$.startTime": startTime,
                                "events.$.endDate": endDate,
                                "events.$.endTime": endTime,
                                "events.$.priority": priority
                            }
                        },function(err,updatedEvent){
                            if(err){
                                console.log('err updating event',err);
                            }
                            res.json({updatedEvent: updatedEvent});
                        });
          }else if(calendar.people){
              for(let i=0; i<calendar.people.length; i++){
                  if(calendar.people[i].userId == req.body.user.id && calendar.people[i].permission == "edit"){
                      Calendar.findOneAndUpdate({"_id": req.body.calendarId, "events._id": editEventId
                        },{
                            "$set":{
                                "events.$.name": eventName,
                                "events.$.eventTypeId": eventType,
                                "events.$.startDate": startDate,
                                "events.$.startTime": startTime,
                                "events.$.endDate": endDate,
                                "events.$.endTime": endTime,
                                "events.$.priority": priority
                            }
                        },function(err,updatedEvent){
                            if(err){
                                console.log('err updating event',err);
                            }
                            res.json({updatedEvent: updatedEvent});
                        });
                  }else{
                      res.status(500).send({error: true, message: 'uh oh! You do not have editing permissions. Talk to the calendar owner! '+error.message});
                  }
              }
          }else{
              res.status(500).send({error: true, message: 'uh oh! something went wrong on our end. Try again! '+ error.message});
          }
      }
  });
});

router.post('/event/delete',function(req,res,next){
    console.log('delete');
    console.log(req.body);
    let calId = req.body.calendarId;
    let eventId = req.body.eventId;
    Calendar.findOne({_id: calId},function(err, calendar){
        if(err){
            console.log(err);
        }
        if(calendar){
            if(calendar.userId == req.body.userId){
                Calendar.update({"_id": calId},
					 	{
                    "$pull":{
                        events:{
                            "_id": eventId
                        }
                    }
                },function(err,deletedEvent){
                    if(err){
                        console.log(err);
                    }
                    res.json({deletedEvent: deletedEvent});
                });
            } else if(calendar.people) {
					let done=false;
	            for(let i=0; i<calendar.people.length; i++){
	                if(calendar.people[i].userId == req.body.userId && calendar.people[i].permission == "edit" && !done){
							 console.log(124);
							 done=true;
	                    Calendar.update({"_id": calId
	                    },{
	                        "$pull":{
	                            events:{
	                                "_id": eventId
	                            }
	                        }
	                    },function(err,deletedEvent){
	                        if(err){
	                            console.log(err);
	                        }
	                        res.json({deletedEvent: deletedEvent});
	                    });
	                }
	            }
	        }else{
	            res.status(500).send({error: true, message: 'uh oh! You do not have editing permissions. Talk to the calendar owner! '+error.message});
	        }
		  }
    });
});

module.exports = router;
