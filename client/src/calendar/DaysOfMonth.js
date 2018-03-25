import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "../css/Month.css";
import "date-format-lite";
import EventObject from '../event/EventObject.js';

const daysInMonth = [
           [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
           [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]];



//TODO: mondayIsFirst is user defined
var mondayIsFirst = true;

var starSvg, circleTiny;

class SingleDay extends Component {

	barColorAdjust = (c,n) => {
		if(!c) return 'rgba(100,120,130,0.2)';
		let cx = [parseInt(c.slice(1,3),16)-n*20,parseInt(c.slice(3,5),16)-n*20,parseInt(c.slice(5,7),16)-n*20];
		return 'rgba('+cx[0]+','+cx[1]+','+cx[2]+',0.5)'
	}

   render() {


      const circleTiny = (c) => <svg className="circle-svg" xmlns="http://www.w3.org/2000/svg"><circle cx='5' cy='5' r='5' fill={c}></circle></svg>;

		const circle1 = <svg style={{width:"100%",height:"100%"}} xmlns="http://www.w3.org/2000/svg"><g><circle cx='50%' cy='50%' r='25%' viewBox='0 0 80 80' preserveAspectRatio='xMinYMin meet'></circle></g></svg>
      const circle2 = <svg style={{width:"100%",height:"100%"}} xmlns="http://www.w3.org/2000/svg"><g><circle cx='50%' cy='50%' r='40%' viewBox='0 0 80 80' preserveAspectRatio='xMinYMin meet'></circle></g></svg>
      const circle3 = <svg style={{width:"100%",height:"100%"}} xmlns="http://www.w3.org/2000/svg"><g><circle cx='50%' cy='50%' r='35%' viewBox='0 0 80 80' preserveAspectRatio='xMinYMin meet' stroke="#a0b0c0" strokeWidth="2px" fill="none"></circle></g></svg>
      const bar = (c) => <svg style={{width:'100%',height:'100%'}} xmlns="http://www.w3.org/2000/svg"><g><rect x='0' y='10%' width='100%' height='5%' fill={c} viewBox='0 0 80 80' preserveAspectRatio='xMinYMin meet'></rect></g></svg>

      //display the bar: if enddate!==startdate don't display dot
      //check ends, startdate and end date for surrent display day for end bars.
      //if this day, month, year is in range of event date, display full bar

      let addClass = "days-card";
      let events = [];
      let svg = "";
      let currentDay = "", selectedDay="", hasEvents="", hasBar=[], barnum=0, barColorAdjust=[0,0,0];

      if (this.props.today) currentDay = <div className="days-background">{circle1}</div>;

      if (this.props.selected) {
         selectedDay = <div className="days-background day-selected-circle">{circle2}</div>;
         addClass=addClass+" day-selected";
      }

      if (this.props.events && this.props.events.length>0) {

         for (let i=0; i<this.props.events.length; i++) {
            //console.log(this.props.events[i].startDate.date("YYYY-MM"),"   ",this.props.yearMonth);
            if (this.props.events[i].spanning) {
               //-- spanning is an internal variable to set the bar
               hasBar.push( <div className="bar-svg">{bar(this.barColorAdjust(this.props.events[i].getEventColor(),barnum))}</div> );
					barnum++;
               //-- add circle for first day in spanning event
               if (this.props.events[i].spanningStart===this.props.dayNum) {
                  hasEvents = <div className="days-background3" >{circle3}</div>;
               }
            } else if(this.props.events[i].isHoliday()) {
               svg = <img src="icon-star.svg" width="10" height="10" />;
            } else {
               //-- only certain events get the event circle
               hasEvents = <div className="days-background3" >{circle3}</div>;
					let c = this.props.events[i].getEventColor();
					if (!c) c='#777';
               svg = <span className="circle-svg">{circleTiny(c)}</span>;
            }

            events.push(svg);
         }
      }

      return (
         <div>
            {hasBar}
            <div className={addClass} id={this.props.dayNum} onClick={()=>this.props.onClickDay(this.props.dayNum)}>
               <div className="days-num">{this.props.dayNum}</div>
               <div className="days-event">{events}</div>
               {hasEvents}
               {selectedDay}
					{currentDay}
            </div>

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
         <Col sm={12} className="days-of-week-header">
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

   //-- all events in our range (month), push each one to a day in an array
   //-- TODO: make sure when events are entered into database, using spanning events to cover months from startdate to enddate
   sortEventsToArray(date, calendar, leapyear) {
      var arr = [];
      for (let i=0; i<32; i++) arr[i]=[];

      var daystart, dayend;
      //console.log(calendar);
      if(!calendar) return arr;

      let currentM = date.date('MM');

      for(let i=0; i<calendar.length; i++) {
        daystart = 0;
		  let event = calendar[i];
        if(event.startDate) {
           daystart = parseInt(event.startDate.date('DD'));
           //-- add in spanning dates
           dayend = parseInt(event.endDate.date('DD'));
           //--catch 0 enddate
           if (event.endDate===0) dayend=daystart;
            //--dont span holidays
            if (event.isHoliday()) {
               dayend = daystart;
            }
            //-- default spanning event is false, create new variable for our internal use
           event.spanning = false;

           if (daystart !== dayend) event.spanning = true;
           //-- spans past current month, set end day to last day
           if (event.startDate.date('MM') !== event.endDate.date('MM') && event.endDate!==0) {
             dayend = 31;
             event.spanning = true; //-- catch the case where days are same, but month is diff

          }
          //--let's make sure we know the first day of a spanning, in case we want to show special graphical cases
          if(event.spanning && (event.startDate.date('MM') === date.date('MM'))) event.spanningStart = daystart;


          //if(!arr[day])arr[day]=[];
          for (let j=daystart; j<=dayend; j++) {
             //-- push SAME event into our month bucket
             arr[j].push(event);
          }
        }
      }

      return arr;
   }

   showDays = (date, currentDate) => {

      if (!date) {
         return <div></div>
      }

      let eventsArray = [];
      let leapyear =((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) ? 1:0;

      //if (Array.isArray(this.props.calendar) && this.props.calendar.length>0) {
         eventsArray = this.sortEventsToArray(date, this.props.calendarEvents, leapyear);
      //}

      //leap year
      let year = parseInt(date.date("YYYY"));
      let selectedDay = parseInt(date.date("DD"));
      let maxDay = daysInMonth[leapyear][parseInt(date.date("MM"))];
      let wkStart = this.findWeekDayNum(date);
      let today = 0;

      if (date.date("YYYY-MM") === currentDate.date("YYYY-MM")) today = parseInt(currentDate.date("DD"));

      if(mondayIsFirst) {
         wkStart = (wkStart===0) ? 6 : wkStart-1;
      }

      let d=0, output=[];
      let yearMonth = date.date("YYYY-MM"); //--used to filter events forn the big calendar list

      for(let k=0; k<6; k++) {

         let row=[];
         for(let i=0; i<7; i++) {
            if (i<wkStart && d===0 || d>=maxDay) {
               row.push (<Col ></Col>);
            }
            if ((i===wkStart || d>0) && d<maxDay) {
               d++;
               let todayBoolean = (d===today) ? true : false;
               let selectBoolean = (d===selectedDay) ? true : false;
               row.push (<Col ><SingleDay dayNum={d} today={todayBoolean} selected={selectBoolean} events={eventsArray[d]} onClickDay={this.onClickDay} yearMonth={yearMonth} key={"dd"+d}/></Col>);
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
      //console.log(this.props.calendarEvents);
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
