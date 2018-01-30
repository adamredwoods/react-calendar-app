import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "../css/Month.css";
import "date-format-lite";

class SingleDay extends Component {

   render() {
      return (
         <div className="days-single">
            {this.props.dayNum}
         </div>
      )
   }
}

export const DaysOfWeek = () => {
    return (
      <Row>
         <Col sm={1}></Col>
         <Col sm={10}>
           <span className="days-of-week">m</span>
           <span className="days-of-week">t</span>
           <span className="days-of-week">w</span>
           <span className="days-of-week">r</span>
           <span className="days-of-week">f</span>
           <span className="days-of-week">sa</span>
           <span className="days-of-week">su</span>
         </Col>
         <Col sm={1}></Col>
      </Row>
    );
}

class DaysOfMonth extends Component {

   findWeekDayNum= (date) => {

      let y=parseInt(date.date("YYYY")),
       m=parseInt(date.date("MM")),
       d=parseInt(date.date("DD"));

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

      if (!date) {
         return <div></div>
      }

      //--display one week
      let j=0;
      console.log(this.findWeekDayNum(date));
      for(let i=this.findWeekDayNum(date); i<7; i++) {
         <SingleDay dayNum={i+j} />;
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
                  <Col sm={10}>
                     {
                        this.showDays(this.props.viewDate)
                     }
                  </Col>
                  <Col sm={1}></Col>
               </Row>
            </div>
         </div>
      )
   }
}

export default DaysOfMonth;
