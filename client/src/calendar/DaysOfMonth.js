import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "../css/Month.css";
import "date-format-lite";

const daysInMonth = [
           [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
           [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]];



//TODO: mondayIsFIrst is user defined
var mondayIsFirst = true;

var starSvg, circleSvg;

class SingleDay extends Component {

   render() {


      const circleSvg = <span className="circle-svg"><svg className="circle-svg" xmlns="http://www.w3.org/2000/svg"><circle cx='5' cy='5' r='5'></circle></svg></span>;

      let addClass = "days-card";
      let events = [];
      let svg = 0;

      if (this.props.today) addClass=addClass+" day-current";
      if (this.props.selected) addClass=addClass+" day-selected";
      if (this.props.events && this.props.events.length>0) {
         for (let i=0; i<this.props.events.length; i++) {
            //console.log(this.props.events[i].startDate.date("YYYY-MM"),"   ",this.props.yearMonth);
            if(this.props.events[i].startDate.date("YYYY-MM")===this.props.yearMonth) {
               svg = circleSvg;
               if(this.props.events[i].eventTypeId===0) svg = <img src="icon-star.svg" width="10" height="10"/>;
               events.push(svg);
            }
         }
      }

      return (
         <div className={addClass} id={this.props.dayNum} onClick={()=>this.props.onClickDay(this.props.dayNum)}>
            <div className="days-num">{this.props.dayNum}</div>
            <div className="days-event">{events}</div>
         </div>
      )
   }
}

export const DaysOfWeek = () => {
   let daysOfWeek = (mondayIsFirst) ?
      (<Row>
        <Col className="days-of-week">m</Col>
        <Col className="days-of-week">t</Col>
        <Col className="days-of-week">w</Col>
        <Col className="days-of-week">r</Col>
        <Col className="days-of-week">f</Col>
        <Col className="days-of-week">sa</Col>
        <Col className="days-of-week">su</Col>
     </Row>) :
     (<Row>
       <Col className="days-of-week">su</Col>
       <Col className="days-of-week">m</Col>
       <Col className="days-of-week">t</Col>
       <Col className="days-of-week">w</Col>
       <Col className="days-of-week">r</Col>
       <Col className="days-of-week">f</Col>
       <Col className="days-of-week">sa</Col>
    </Row>)

    return (
      <Row>
         <Col sm={12}>
         { daysOfWeek }
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

   sortEventsToArray(calendar) {
      var arr = [];
      console.log(calendar);
      if(!calendar) return arr;

      for(let i=0; i<calendar.length; i++) {
        let day = 0
        if(calendar[i].events.startDate) day = parseInt(calendar[i].events.startDate.date('DD'));
        if(!arr[day])arr[day]=[];
        arr[day].push(calendar[i].events);
      }

      return arr;
   }

   showDays = (date, currentDate) => {

      if (!date) {
         return <div></div>
      }

      let eventsArray = [];

      //if (Array.isArray(this.props.calendar) && this.props.calendar.length>0) {
         eventsArray = this.sortEventsToArray(this.props.calendar);
      //}

      //leap year
      let year = parseInt(date.date("YYYY"));
      let selectedDay = parseInt(date.date("DD"));
      let leapyear =((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) ? 1:0;
      let maxDay = daysInMonth[leapyear][parseInt(date.date("MM"))];
      let wkStart = this.findWeekDayNum(date);
      let today = 0;

      if (date.date("YYYY-MM") === currentDate.date("YYYY-MM")) today = parseInt(currentDate.date("DD"));

      if(mondayIsFirst) {
         wkStart = (wkStart===0) ? 6 : wkStart-1;
      }

      let d=0, output=[];
      let yearMonth = date.date("YYYY-MM"); //--used to filter events forn the big calendar list

      for(let k=0; k<5; k++) {

         let row=[];
         for(let i=0; i<7; i++) {
            if (i<wkStart && d===0 || d>=maxDay) {
               row.push (<Col ></Col>);
            }
            if ((i===wkStart || d>0) && d<maxDay) {
               d++;
               let todayBoolean = (d===today) ? true : false;
               let selectBoolean = (d===selectedDay) ? true : false;
               row.push (<Col ><SingleDay dayNum={d} today={todayBoolean} selected={selectBoolean} events={eventsArray[d]} onClickDay={this.onClickDay} yearMonth={yearMonth}/></Col>);
            }
         }
         output.push(<Row>{row}</Row>);
      }
      return output;
   }

   onClickDay = (day) => {
      //--get new day data from backend

      //--send new date
      let newDate = (this.props.viewDate.date("YYYY-MM")+"-"+day).date();
      this.props.onClickDay(newDate);

   }

   render() {
      //console.log(this.props.calendar);
      //-- find out first day of week and start loop there
      return (
         <div>
            <DaysOfWeek />
            <div className="days-in-month">
               <Row>
                  <Col sm={12}>{
                     this.showDays(this.props.viewDate, this.props.currentDate)
                  }</Col>
               </Row>
            </div>
         </div>
      )
   }
}

export default DaysOfMonth;
