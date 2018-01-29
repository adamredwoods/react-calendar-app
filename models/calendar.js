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
    priority: Number,
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
  events: [eventSchema]
});

var Calendar = mongoose.model("Calendar", calendarSchema);

module.exports = Calendar;