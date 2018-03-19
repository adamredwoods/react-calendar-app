import React, { Component } from 'react';
import '../css/Edit.css';
import '../css/ButtonsAndMore.css';
import { Row, Col, Hidden, ClearFix } from 'react-grid-system';
import "date-format-lite";
import MiniCalendarPicker from "../helper/MiniCalendarPicker";
import Holidays from 'date-holidays';
import EditEvent from './EditEvent.js';
import EventObject from '../event/EventObject.js';

class AddEvent extends EditEvent {
   constructor(props){
      super(props);

   }

   componentDidMount() {

      let sd, ed;
      if(this.props.viewDate) {
         sd = ed = this.props.viewDate.date("YYYY-MM-DD");
      } else {
         sd = ed = new Date().date("YYYY-MM-DD");
      }

      this.setState({
         id: 0,
         name: "",
         startDate: sd,
         startTime: "09:00",
         endDate: ed,
         endTime: "",
         eventType: 1,
         priority: 0,
         error: null
      });
   }

   editCurrentEvent = (e, history) => {
       e.preventDefault();
       if(this.state.startDate.date('U') > this.state.endDate.date('U') && (this.state.endDate)){
            this.setState({error: 'Uh oh! Before submitting, please enter a start date that is prior to your end date!'});
       }else{
            let eventObj = new EventObject(this.state);
				eventObj.setId(this.state.id);
				//-- convert dates back to millisecs
				eventObj.convertDatesToMillisecs();
				//-- pass history back to parent to call page change after backend updates
            this.props.addEvent(eventObj, history);
       }
   }

}

export default AddEvent;
