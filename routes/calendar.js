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
// Model.aggregate([{
//         $lookup: {
//             from: 'translations',
//             localField: '_id',
//             foreignField: 'item_id',
//             as: 'translation'
//         },
//     }, {
//         $project: {
//             "label": "$label",
//             "items": "$items",
//             "translation": {
//                 "$filter": {
//                     "input": "$translation",
//                     "as": "page",
//                     "cond": {
//                         "$eq": ["$$page.lang_key", lang]
//                     }
//                 }
//             }
//         }
//     }])
// db.transactions.aggregate([
//   {
//     $match: {
//       transactionDate: {
//         $gte: ISODate("2017-01-01T00:00:00.000Z"),
//         $lt: ISODate("2017-01-31T23:59:59.000Z")
//       }
//     }
//   },
//   {
//     $group: {
//       _id: null,
//       total: {
//         $sum: "$amount"
//       }
//     }
//   }
// ]);
router.post('/events', function(req,res,next){
    console.log(req.body.calendar._id);
    var start = Number(req.body.startDate.date('U'));
    var end = Number(req.body.endDate.date('U'));
//     mongoose.connection.db.collection('calendars').aggregate([{$match: {"_id": "5a739665d178e672483d43ae"}},{
//     $project: {events: {
//         $filter: {
//             input: "$events",
//             as: "event",
//             cond: {
//                 $and: [{
//                     $gte: ["$$event.startDate",1517472000000]
//                     },{
//                     $lte: ["$$event.startDate",1520064000000]
//                  }]
//             }}
//          }
//     }}
// ]
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

	// Calendar.aggregate({$match: {_id: Mongoose.Types.ObjectId(req.body.calendar._id)}}, function(err, result) {
	// 		 if(err){
	// 			  console.log(err);
	// 		 }
	// 		 if (result) {
	// 			console.log(result);
	// 		 }
	// 	 });


    // });
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
        })
        // .then(function(err,updatedCalendar){
        //     if(err){
        //         console.log(err);
        //     }
        //     console.log('hi from the new cal');
        //     console.log(updatedCalendar);
        //     res.json({calendar: updatedCalendar});
            // Calendar.findOne({_id: updatedCalendar._id}, function(err,calendar){
            //     if(err){
            //         console.log(err);
            //         console.log('error in the second cal db call');
            //     }
            //     res.json({calendar: calendar});
            // });
        // });
	});
});

router.post('/event/delete',function(req,res,next){
    console.log('delete');
    console.log(req.body);
});

router.post('/calendar/edit/one',function(req,res,next){
    console.log('edit');
    console.log(req.body);
});

module.exports = router;
