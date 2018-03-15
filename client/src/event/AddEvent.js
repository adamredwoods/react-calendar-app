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
      if(this.props.viewDate) {
         //console.log(this.props.initialValues);
         sd = ed = this.props.viewDate;

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

}

export default AddEvent;
