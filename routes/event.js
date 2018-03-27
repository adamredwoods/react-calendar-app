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

//
//-- /calendar/event route
//
//-- fetch events in range
router.post('/', function(req,res,next){

    var start = Number(req.body.startDate.date('U'));
    var end = Number(req.body.endDate.date('U'));

	 if (req.body.calendar && req.body.calendar._id) {
	    Calendar.aggregate([
	        {$match: {_id: Mongoose.Types.ObjectId(req.body.calendar._id)}},
	        {$unwind: "$events"},
			  {"$match":{"events.startDate":{$gte: start, $lte: end}}}
		  ], function(err, events) {
				  if(err){
			         console.log(err);
			     }
			     if (events) {

					 res.json({events: events});
			     }
			  });
	}
});

//-- /calendar/event/add
router.post('/add', function(req,res,next){
	console.log("POST /event/add");

    Calendar.findOne({_id: req.body.calendar._id},function(err,calendar){
        if(err){
            console.log(err);
        }
        let name = req.body.name;
        let startDate = Number((req.body.startDate+"Z+0").date('U'));
        let startTime = req.body.startTime;
        let endDate = Number((req.body.endDate+"Z+0").date('U'));
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
                        res.json({event: {startDate: startDate, endDate:endDate, origStart: req.body.endDate, converted: req.body.startDate.date('U') }});
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

//-- /calendar/event/edit
//-- TODO: cleanup!!!
//-- don't json return entire calendar!!!
router.post('/edit', function(req, res, next) {
  console.log("/event/edit");

  let eventObj = {
	  _id: req.body.eventObj.id,
	  name: req.body.eventObj.name,
	  eventTypeId: req.body.eventObj.eventType,
	  startDate: Number(req.body.eventObj.startDate.date('U')),
	  endDate: Number(req.body.eventObj.endDate.date('U')),
	  startTime: req.body.eventObj.startTime,
	  endTime: req.body.eventObj.endTime,
	  priority: req.body.eventObj.priority
  }

  Calendar.findOne({_id: req.body.calendarId},function(err, calendar){
      if(err){
          console.log(err);
      }
      if(calendar){
          if(calendar.userId == req.body.user.id){
              Calendar.findOneAndUpdate({"_id": req.body.calendarId, "events._id": eventObj._id
					 },{
						  "$set":{
								"events.$.name": eventObj.name,
								"events.$.eventTypeId": eventObj.eventTypeId,
								"events.$.startDate": eventObj.startDate,
								"events.$.startTime": eventObj.startTime,
								"events.$.endDate": eventObj.endDate,
								"events.$.endTime": eventObj.endTime,
								"events.$.priority": eventObj.priority
						  }
					 },function(err,updatedEvent){
						  if(err){
								console.log('err updating event',err);
						  }
						  //--returning the original object
						  res.json({updatedEvent: eventObj});
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
									 //--returning the original object
                            res.json({updatedEvent: eventObj});
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

//-- /calendar/event/delete
router.post('/delete',function(req,res,next){
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
