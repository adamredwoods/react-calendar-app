import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "../css/Month.css";

class SingleDay extends Component {

   render() {
      return (
         <div className="days-in-row-single">
            {this.props.dayNum}
         </div>
      )
   }
}

class DaysOfMonth extends Component {

   findWeekDayNum= (currentDate) => {
      let y=0, m=0, d=0;
      if (m <= 2) { /* Jan or Feb month adjust */
         m += 12;
         y--;
      }

      let y2 = y + Math.floor(y/4) - Math.floor(y/100) + Math.floor(y/400);
      let m2 = (13*(m+1)/5);
      let i = (d + Math.floor(m2) + y2)-1;

      return i%7;
   }

   showDays = (currentDate) => {

      //--display one week
      let j=0;
      for(let i=this.findWeekDayNum(currentDate); i<7; i++) {
         //<SingleDay dayNum={i+j}>;
         j++;
      }
   }

   render() {

      //-- find out first day of week and start loop there
      return (
      <div className="days-in-month">
         <Row>
            <Col sm={1}></Col>
            <Col sm={7}>
               {
                  this.showDays(this.props.currentDate)
               }
            </Col>
            <Col sm={4}></Col>
         </Row>
      </div>
      )
   }
}

export default DaysOfMonth;
