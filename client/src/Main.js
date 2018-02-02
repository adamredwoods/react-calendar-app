import React, { Component } from 'react';
import './css/Main.css';
import Month from './calendar/Month.js';
import Week from './calendar/Week.js';
import Day from './calendar/Day.js';
import {
  AddEvent,
  AddHoliday,
  AddContributor,
  EditCalendar
} from "./Edit.js";
import Holidays from 'date-holidays';
import axios from 'axios';
import { Row, Col, Hidden, ClearFix } from 'react-grid-system';
import "date-format-lite";
const hd = new Holidays();

const daysInMonth = [
           [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
           [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]];

class Main extends Component {

   constructor (props) {
      super(props);
      this.state = {
        viewDate: null,
        currentDate: null,
        email: '',
        permission: 'view',
        calName: '',
        countryCode: '',
        currentYear: '2018',
        currentYearHolidays: [],
        dateQuery: ['2018-01-01', '2018-02-18'],
        calendar: null,
        eventName: '',
        eStartDate: '',
        eStartTime: '',
        eEndDate: '',
        eEndTime: '',
        eventType: '3',
        fullCalendar: null
      }
      this.handleCountryCodeChange = this.handleCountryCodeChange.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handlePermissionChange = this.handlePermissionChange.bind(this);
      this.handleNameChange = this.handleNameChange.bind(this);
      //this.handleAddEventChange = this.handleAddEventChange.bind(this);
      this.handleTypeChange = this.handleTypeChange.bind(this);
   }

   componentDidMount() {
      let date = new Date();
      this.setState({ currentDate: date, viewDate: date.format("YYYY-MM-DD") });
      this.getAllEvents([date.format("YYYY-MM")+"-01", date.format("YYYY-MM")+"-31"])

    }

  getAllEvents = (dateQuery) => {
    let startDate = dateQuery[0];
    let endDate = dateQuery[1];
    let currentUser = this.props.user;
    let currentCalendar = JSON.parse(localStorage.getItem('calendar'));
    let base = this;
    axios.post('/calendar/events', {
       startDate: startDate,
       endDate: endDate,
       calendar: currentCalendar,
       user: currentUser
     }).then(response => {
       console.log(response.data);
       base.setState({calendar: response.data.events});
     }).catch(err => {
       console.log('backend cal err on db send - '+err);
     });
   }
   handleEventNameChange = (event) => {
     this.setState({eventName: event.target.value});
   }
   handleAddEventChange = (event) => {
    //  let stateChange =  event.target.name;
     console.log(event.target.name);
     var en=event.target.name;
     var et=event.target.value;
    this.setState({ [en]: et});
   }

   handleTypeChange = (event) => {
     this.setState({eventType: event.target.value})
   }

   clickChangeDay = (newDate) => {
      console.log("..click: change date",newDate);
      this.setState({viewDate: newDate});
   }

   handleCountryCodeChange = (event) => {
        this.setState({countryCode: event.target.value}, () => {
            let holidays = new Holidays(this.state.countryCode);
            let allHolidays = holidays.getHolidays(this.state.currentYear);
            this.setState({currentYearHolidays: allHolidays});
        });
    }

    handleNameChange = (event) => {
        this.setState({calName: event.target.value});
    }

    handleEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    handlePermissionChange = (event) => {
        this.setState({permission: event.target.value});
    }

    addHolidays = (event) => {
        event.preventDefault();
        let base = this;
        let currentUser = this.props.user;
        let currentCalendar = JSON.parse(localStorage.getItem("calendar"));
        let currentYear = this.state.currentYear;
        let holidays = this.state.currentYearHolidays;
		axios.post('/calendar',{
            holidays: holidays,
            year: currentYear,
            user: currentUser,
            calendar: currentCalendar
        }).then(response => {
            localStorage.setItem('calendar', JSON.stringify(response.data.calendar));
            base.setState({ fullCalendar: response.data.calendar});
            base.getAllEvents([
              new Date.format("YYYY-MM") + "-01",
              new Date.format("YYYY-MM") + "-31"
            ]);
        }).catch(err => {
            console.log('backend error we hope', err);
        });
    }

    addEvent = (event) => {
      event.preventDefault();
      let name = this.state.eventName;
      let base = this;
      let startDate = this.state.eStartDate;
      let startTime = this.state.eStartTime;
      let endDate = this.state.eEndDate;
      let endTime = this.state.eEndTime;
      let eventType = this.state.eventType;
      let currentUser = this.props.user;
      let currentCalendar = JSON.parse(localStorage.getItem("calendar"));
      axios.post('/calendar/one',{
        name: name,
        startDate: startDate,
        startTime: startTime,
        endDate: endDate,
        endTime: endTime,
        eventType: eventType,
        user: currentUser,
        calendar: currentCalendar,
      }).then(response => {
        console.log(response.data);
      }).catch(err => {
        console.log('backend err w add event', err);
      });
    }

    editCal = (event) => {
        event.preventDefault();
        let base = this;
        let email = this.state.email;
        let currentUser = this.props.user;
        let permission = this.state.permission;
        let name = this.state.calName;
        let currentCalendar = JSON.parse(localStorage.getItem("calendar"));
        axios.post('/calendar/edit',{
            user: currentUser,
            calendar: currentCalendar,
            email: email,
            permission: permission,
            name: name
        }).then(response => {
            console.log(response.data);
        }).catch(err => {
            console.log('backend error with change database and send', err);
        });
    }

  render(){
      let mainCal = <div />
      let action = this.props.eventAction; //--could be a string or number

      //console.log(this.props.calendar);
      if(this.props.user){
         if(action==2) {
            mainCal = (
               <AddEvent handleEventNameChange={(event) => this.handleEventNameChange(event)} viewDate={this.state.viewDate} onClickEventAction={this.props.onClickEventAction} addEvent={this.addEvent} handleChange={this.handleAddEventChange} name={this.state.eventName} startDate={this.state.eStartDate} startTime={this.state.eStartTime} endDate={this.state.eEndDate} endTime={this.state.eEndTime} eventType={this.state.eventType} handleTypeChange={(event)=>this.handleTypeChange(event)} />
            )
         } else if(action==4){
          mainCal = (
            <AddHoliday onClickEventAction={this.props.onClickEventAction} countryCode={this.state.countryCode} handleChange={event => this.handleCountryCodeChange(event)} addHolidays={this.addHolidays} />
          )
         }else if(action==1){
           mainCal = (
             <EditCalendar onClickEventAction={this.props.onClickEventAction} editCal={this.editCal} name={this.state.calName} handleName={event => this.handleNameChange(event)} />
           )
         }else if(action==3){
          mainCal = (
            <AddContributor onClickEventAction={this.props.onClickEventAction} handlePermChange={event => this.handlePermissionChange(event)} handleChange={event => this.handleEmailChange(event)} permission={this.state.permission} email={this.state.email} editCal={this.editCal} />
          )
         }else{
            mainCal = (
               <div className="main-page">
                  <Row nogutter>
                     <Col sm={8}>
                        <Month viewDate={this.state.viewDate} currentDate={this.state.currentDate} clickChangeDay={this.clickChangeDay} calendar={this.state.calendar}/>
                     </Col>

                     <Col sm={4}>
                        <Day viewDate={this.state.viewDate} currentDate={this.state.currentDate} calendar={this.state.calendar}/>
                     </Col>
                  </Row>
                  <Hidden xs sm>
                     <Row>

                        <Col sm={12}>
                           <Week viewDate={this.state.viewDate} currentDate={this.state.currentDate} clickChangeDay={this.clickChangeDay}/>
                        </Col>
                     </Row>
                  </Hidden>
               </div>
            );
         }
      } else {
         mainCal = <div className="main-no-user"><h1>Please login or signup.</h1></div>
      }
      return (
        <div className="main-home">
          {mainCal}
        </div>
      );
   }

}

export default Main;
