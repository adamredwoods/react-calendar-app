import React, { Component } from 'react';
import '../css/Day.css';

class Day extends Component {
   constructor(props) {
      super(props);

      this.state={

      }
   }

   getDayEvents(date, calendar) {
      var arr = [], j=0;
      //console.log(calendar);
      if (!calendar) return arr;

      for(let i=0; i<calendar.length; i++) {
        let day = 0
        if(calendar[i].events) day = calendar[i].events.startDate.date('MM-DD');

        if (day === date.date('MM-DD')) {
           arr[j] = (calendar[i].events);
           j++;
        }
      }

      //TODO: sort by time HH:MM 24-hr system

      return arr;
   }

    render(){
      //parse through props.viewDate to match what is in the props.calendar
      var arr = this.getDayEvents(this.props.viewDate, this.props.calendar);

      const list = arr.map((eventObj) => (
         <div>
           <h2>{eventObj.name}</h2>
           <div>
              <span>{eventObj.startDate.date("YYYY-MM-DD")}</span>
              <h4>{eventObj.startTime}</h4>
           </div>
        </div>
     ));


      console.log(arr);
        return(
            <div className="day-container">
                {list}
            </div>
        );
    }
}

export default Day;
