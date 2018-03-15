import React, { Component } from 'react';
import '../css/Edit.css';
import '../css/ButtonsAndMore.css';
import { Row, Col, Hidden, ClearFix } from 'react-grid-system';
import "date-format-lite";
import MiniCalendarPicker from "../helper/MiniCalendarPicker";
import Holidays from 'date-holidays';
import EditEvent from './EditEvent.js';

class AddEvent extends EditEvent {
   constructor(props){
      super(props);

      this.editCurrentEvent = this.editCurrentEvent.bind(this);
   }

   componentDidMount() {

      let sd, ed;
      if(this.props.initialValues) {
         console.log(this.props.initialValues);
         sd = ed = this.props.initialValues.date;

      } else {
         sd = ed = new Date();
      }

      this.setState({
         _id: 0,
         eventName: "",
         startDate: sd,
         startTime: "09:00",
         endDate: ed,
         endTime: "",
         eventTypeId: 1,
         priority: 0,
         error: null
      });
   }

   editCurrentEvent(e) {
        e.preventDefault();
       if(this.state.startDate.date('U') > this.state.endDate.date('U')){
            this.setState({error: 'Uh oh! Before submitting, please enter a start date that is prior to your end date!'});
       }else{
            let eventObj = this.state;
            this.props.addEvent(eventObj);
       }
   }
}

export default AddEvent;
