import React, { Component } from 'react';
import '../css/Day.css';

class Day extends Component {
   constructor(props) {
      super(props);

      this.state={

      }
   }

   getEvents(date, calendar) {
      var arr=[];

      if(!date) return arr;

      var currDate = date.date("YYYY-MM-DD");

      if (!calendar || !calendar.events) return arr;

      for(let i=0; i<calendar.events.length; i++) {
         if(calendar.events[i].startDate.date("YYYY-MM-DD")=== currDate) {
            arr.push(calendar.events[i]);

         }
      }
   }

    render(){
      //parse through props.viewDate to match what is in the props.calendar
      var arr = this.getEvents(this.props.viewDate, this.props.calendar);
      //console.log(arr);
        return(
            <div className="day-container">
                <h1>{arr}</h1>
            </div>
        );
    }
}

export default Day;
