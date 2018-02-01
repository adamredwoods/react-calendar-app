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
} from "./Event.js";
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

      }
      this.handleCountryCodeChange = this.handleCountryCodeChange.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handlePermissionChange = this.handlePermissionChange.bind(this);
      this.handleNameChange = this.handleNameChange.bind(this);
   }

   componentDidMount() {
      let date = new Date();
      this.setState({ currentDate: date, viewDate: date.format("YYYY-MM-DD") });
   }

   clickChangeDay = (newDate) => {
      console.log("..click: change date",newDate);
      this.setState({viewDate: newDate});
   }

   clickEditEvent = () => {

   }

   clickAddEvent = () => {

   }

   handleCountryCodeChange(event) {
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
        }).catch(err => {
            console.log('backend error we hope', err);
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

      console.log(this.props.calendar);
      if(this.props.user){
         if(action==2) {
            mainCal = (
               <AddEvent viewDate={this.state.viewDate} onClickEventAction={this.props.onClickEventAction}/>
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
                        <Month viewDate={this.state.viewDate} currentDate={this.state.currentDate} clickChangeDay={this.clickChangeDay}/>
                     </Col>

                     <Col sm={4}>
                        <Day viewDate={this.state.viewDate} currentDate={this.state.currentDate}/>
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
