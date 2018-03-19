import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "date-format-lite";
import "../css/MiniCalendarPicker.css";

const daysInMonth = [
           [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
           [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]];

var mondayIsFirst= true;


export const DaysOfWeek = () => {
	let weekStyle = {fontSize: "0.5rem"}
 	let daysOfWeek = (mondayIsFirst) ?
     (<Row>
       <Col style={weekStyle}>m</Col>
       <Col style={weekStyle}>t</Col>
       <Col style={weekStyle}>w</Col>
       <Col style={weekStyle}>r</Col>
       <Col style={weekStyle}>f</Col>
       <Col style={weekStyle}>sa</Col>
       <Col style={weekStyle}>su</Col>
    </Row>) :
    (<Row>
      <Col style={weekStyle}>su</Col>
      <Col style={weekStyle}>m</Col>
      <Col style={weekStyle}>t</Col>
      <Col style={weekStyle}>w</Col>
      <Col style={weekStyle}>r</Col>
      <Col style={weekStyle}>f</Col>
      <Col style={weekStyle}>sa</Col>
   </Row>)

   return (
     <Row>
        <Col sm={12}>
        { daysOfWeek }
        </Col>
     </Row>
   );
}


class MiniCalendarPicker extends Component {
   constructor(props) {
      super(props);
      this.state = {
         viewDate: "",
         selectedDay: "",
			currentDate: ""
      }
   }

   componentDidMount() {
		let d = this.props.value || new Date().format('YYYY-MM-DD');
      this.setState({ selectedDay: d, currentDate: d });
   }

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

		let inputDay = this.props.value;

      //leap year
      let year = parseInt(date.date("YYYY"));
      let selectedDay = parseInt(inputDay.date("DD"));
      let leapyear =((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) ? 1:0;
      let maxDay = daysInMonth[leapyear][parseInt(date.date("MM"))];
      let wkStart = this.findWeekDayNum(date);
      let today = 0;



      if (date.date("YYYY-MM") !== inputDay.date("YYYY-MM")) selectedDay = 0;

      if(mondayIsFirst) {
         wkStart = (wkStart===0) ? 6 : wkStart-1;
      }

      let d=0, output=[];
      let yearMonth = date.date("YYYY-MM"); //--used to filter events forn the big calendar list

      for(let k=0; k<5; k++) {

         let row=[];
         for(let i=0; i<7; i++) {
            if (i<wkStart && d===0 || d>=maxDay) {
               row.push (<Col key={i} ></Col>);
            }
            if ((i===wkStart || d>0) && d<maxDay) {
               d++;

               let classSelect = (d===selectedDay) ? "day-single mini-selected" : "day-single";
               row.push (<div className={classSelect} onClick={this.onClickDay.bind(this,d)} key={"k"+i}>{d}</div>);
            }
         }
         output.push(<Row key={"r"+k}>{row}</Row>);
      }
      return output;
   }

   prevMonth = (e) => {
      let m = parseInt(this.state.currentDate.date("MM"));
      let y = parseInt(this.state.currentDate.date("YYYY"));
      m=m-1;
      if (m<1) {
         m=12;
         y=y-1;
      }
      let newDate = (y+"-"+m+"-"+"1").date('YYYY-MM-DD');
      this.setState({selectedDay: newDate, currentDate: newDate});
		if (this.props.onClick) {
         this.props.onClick({target: {name:this.props.name, value:newDate}});
      }
   }

   nextMonth = (e) => {
      let m = parseInt(this.state.currentDate.date("MM"));
      let y = parseInt(this.state.currentDate.date("YYYY"));
      m=m+1;
      if (m>12) {
         m=1;
         y=y+1;
      }
      let newDate = (y+"-"+m+"-"+"1").date('YYYY-MM-DD');
      this.setState({selectedDay: newDate, currentDate: newDate});
		if (this.props.onClick) {
         this.props.onClick({target: {name:this.props.name, value:newDate}});
      }
   }

   onClickDay = (day) => {
      //--get new day data from backend

      //--send new date, and unfortunately, the date format npm wants the date to be perfect or it will not work
		let addZero = (day<10) ? "0" : "";
      let newDate = (this.state.selectedDay.date("YYYY-MM")+"-"+addZero+day); //.date();
      this.setState({selectedDay: newDate});

      if (this.props.onClick) {
         this.props.onClick({target: {name:this.props.name, value:newDate}});
      }

   }

   render() {


		let month = "";
		if (this.props.value) {
			month = this.props.value.date("MMMM")+" "+this.props.value.date("YYYY");
		}

      return (
         <div className="mini-calendar-picker">
            <Row>

               <div style={{width:"100%"}}>
                  <span className="button-left" onClick={this.prevMonth}>&lt;</span>
                  <span className="header">{month}</span>
                  <span className="button-right" onClick={this.nextMonth}>&gt;</span>
               </div>

            </Row>
            <Row>
               <Col sm={12}>{
                  this.showDays(this.props.value)
               }</Col>
            </Row>
         </div>
      )
   }
}

export default MiniCalendarPicker;
