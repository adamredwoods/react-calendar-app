import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "../css/Month.css";
import "date-format-lite";

const daysInMonth = [
           [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
           [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]];

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

         <Col sm={12}>
            <Row>
           <Col className="days-of-week">m</Col>
           <Col className="days-of-week">t</Col>
           <Col className="days-of-week">w</Col>
           <Col className="days-of-week">r</Col>
           <Col className="days-of-week">f</Col>
           <Col className="days-of-week">sa</Col>
           <Col className="days-of-week">su</Col>
           </Row>
         </Col>

      </Row>
    );
}

class DaysOfMonth extends Component {

   findWeekDayNum= (date) => {

      let y=parseInt(date.date("YYYY")),
       m=parseInt(date.date("MM")),
       d=1; //get the FIRST day

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
      let j=0, output=[];

      let wkStart = this.findWeekDayNum(date);
      let maxDay = daysInMonth[0][parseInt(date.date("MM"))];

      console.log(wkStart, maxDay);
      for(let k=0; k<5; k++) {
         // output.push(<Row>);
         let row=[];
         for(let i=0; i<7; i++) {
            if (i<wkStart && j===0 || j>=maxDay) {
               row.push (<Col ></Col>);
            }
            if ((i===wkStart || j>0) && j<maxDay) {
               j++;
               row.push (<Col ><SingleDay dayNum={j} /></Col>);
            }
         }
         output.push(<Row>{row}</Row>);
      }
      return output;
   }

   render() {

      //-- find out first day of week and start loop there
      return (
         <div>
            <DaysOfWeek />
            <div className="days-in-month">
               <Row>
                  <Col sm={12}>{
                     this.showDays(this.props.viewDate)
                  }</Col>
               </Row>
            </div>
         </div>
      )
   }
}

export default DaysOfMonth;
