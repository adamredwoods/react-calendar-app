const mongoose = require("mongoose");

//for repeating types, we can set different numbers for different types of repeats
const eventSchema = new mongoose.Schema({
    name: String,
    eventTypeId: Number,
    startDate: { type: Date, default: Date.now},
    endDate: { type: Date, default: Date.now },
    startTime: Date,
    endTime: Date,
    repeating: Number,
    priority: { type: Number, default: 1},
    icon: String
})

//create schema
const calendarSchema = new mongoose.Schema({
  name: String,
  userId: {
    type: String,
    required: true
  },
  eventTypes: [{
      eventTypeId: Number,
      name: String
  }],
  events: [eventSchema],
  people: [{
    userId: {
      type: String
    },
    permission: {
      type: String,
      default: 'view'
    }
  }]
});

var Calendar = mongoose.model("Calendar", calendarSchema);
var CalEvent = mongoose.model("CalEvent", eventSchema);

module.exports = { Calendar, CalEvent };