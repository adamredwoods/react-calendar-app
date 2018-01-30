import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "../css/Month.css";
import "date-format-lite";

class SingleDay extends Component {

   render() {
      return (
         <div className="days-in-row-single">
            {this.props.dayNum}
         </div>
      )
   }
}

export const DaysOfWeek = () => {
    return (
      <Col sm={1}></Col>
      <Col sm={7}>
        <span classname="days-of-week">M</span>
        <span classname="days-of-week">T</span>
        <span classname="days-of-week">W</span>
        <span classname="days-of-week">R</span>
        <span classname="days-of-week">F</span>
        <span classname="days-of-week">SA</span>
        <span classname="days-of-week">SU</span>
      </Col>
      <Col sm={4}></Col>
    );
}

class DaysOfMonth extends Component {

   findWeekDayNum= (date) => {
      let y=date.date("YYYY"),
       m=date.date("MM"),
       d=date.date("DD");

      if (m <= 2) { /* Jan or Feb month adjust */
         m += 12;
         y--;
      }

      let y2 = y + Math.floor(y/4) - Math.floor(y/100) + Math.floor(y/400);
      let m2 = (13*(m+1)/5);
      let i = (d + Math.floor(m2) + y2)-1;

      return i%7;
   }

   showDays = (date) => {

      //--display one week
      let j=0;
      for(let i=this.findWeekDayNum(date); i<7; i++) {
         <SingleDay dayNum={i+j}>;
         j++;
      }
   }

   render() {

      //-- find out first day of week and start loop there
      return (
         <div>
            <DaysOfWeek />
            <div className="days-in-month">
               <Row>
                  <Col sm={1}></Col>
                  <Col sm={7}>
                     {
                        this.showDays(this.props.viewDate)
                     }
                  </Col>
                  <Col sm={4}></Col>
               </Row>
            </div>
         </div>
      )
   }
}

export default DaysOfMonth;
