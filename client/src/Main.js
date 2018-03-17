import React, { Component } from 'react';
import './css/Main.css';
import Month from './calendar/Month.js';
import Week from './calendar/Week.js';
import Day from './calendar/Day.js';
import AddEvent from './event/AddEvent.js';
import AddHoliday from './event/AddHoliday.js';
import AddContributor from './calendar/AddContributor.js';
import EditCalendar from './calendar/EditCalendar.js';
import EditEvent from './event/EditEvent.js';
import DeleteEvent from './event/DeleteEvent.js';
import AddCalendar from './calendar/AddCalendar.js';
import Holidays from 'date-holidays';
import axios from 'axios';
import {Router, Route, Switch} from 'react-router';
import {Link, BrowserRouter} from 'react-router-dom';
import { Row, Col, Hidden, ClearFix } from 'react-grid-system';
import EventObject from './event/EventObject.js';
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
        eventId: '',
        eStartDate: '',
        eStartTime: '',
        eEndDate: '',
        eEndTime: '',
        eventType: '3',
        eventPriority: '2',
        fullCalendar: null,
        eventToEdit: null
      }

      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handlePermissionChange = this.handlePermissionChange.bind(this);
      this.handleNameChange = this.handleNameChange.bind(this);

      this.onClickEditDayEvent = this.onClickEditDayEvent.bind(this);
    }

   componentDidMount() {
      let date = this.state.viewDate;
      if(date ===null) date = new Date();
      this.setState({ currentDate: date, viewDate: date.format("YYYY-MM-DD") });
      this.getAllEvents([date.format("YYYY-MM")+"-01", date.format("YYYY-MM")+"-31"])

    }

	 getAllEvents = (dateQuery) => {
	    let startDate = dateQuery[0];
	    let endDate = dateQuery[1];
	    let currentUser = this.props.user;
	    let currentCalendar = JSON.parse(localStorage.getItem('calendar'));
	    let base = this;
		 //--clearing it out first will prevent old data flashing
		 this.setState({calendar: 0});
	    axios.post('/calendar/events', {
	       startDate: startDate,
	       endDate: endDate,
	       calendar: currentCalendar,
	       user: currentUser
	     }).then(response => {
	       //console.log(response.data);
	       base.setState({calendar: response.data.events});
	     }).catch(err => {
	       console.log('backend cal err on db send - '+err);
	     });
   }



   clickChangeDay = (newDate) => {
      console.log("..click: change date",newDate);
      //-- changing months, watch for race conditions
      if (newDate.date("YYYY-MM")!==(this.state.viewDate.date("YYYY-MM"))) {
            let ym = newDate.date("YYYY-MM");
            this.getAllEvents([ ym+"-01", ym+"-31" ]);
      }
      this.setState({viewDate: newDate}, function(err, result) {

      });
   }

   onClickEditDayEvent = (eventObj) => {
      this.setState({eventToEdit: eventObj}, () => {
        //console.log(this.state.eventToEdit);
        //--********* This is a bug, we lose eventToEdit when this.props.onClickEventAction is called!!!!!
        //this.props.onClickEventAction(5);
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
		axios.post('/calendar/addHoliday',{
		   holidays: holidays,
		   year: currentYear,
		   user: currentUser,
		   calendar: currentCalendar
		}).then(response => {
		   localStorage.setItem('calendar', JSON.stringify(response.data.calendar));
		   base.setState({ fullCalendar: response.data.calendar});
		   // base.getAllEvents([
		   //   new Date.format("YYYY-MM") + "-01",
		   //   new Date.format("YYYY-MM") + "-31"
		   // ]);
		   base.props.onClickEventAction(0);
		}).catch(err => {
		   console.log('backend error we hope', err);
		});
    }


    //
    //-- this is the new way to add events, call this from inside the editing component and send an object
    addEvent = (eventObj, history) => {

      let name = eventObj.name;
      let base = this;

      let currentUser = this.props.user;
      let currentCalendar = JSON.parse(localStorage.getItem("calendar"));
      axios.post('/calendar/one',Object.assign(eventObj,{
        user: currentUser,
        calendar: currentCalendar
	  	})).then(response => {
        //console.log(response.data);

		  //-- update the calendar state
		  let calendar = base.state.calendar;
		  calendar.push({"events":eventObj});
		  base.setState({calendar: calendar});

        //TODO: revese lookup this link
		  history.push("/")
      }).catch(err => {
        console.log('backend err w add event', err);
      });
    }

    editEvent = (eventObj, history) => {
      console.log('POST editone');
      //console.log(eventObj);
      let currentCalendar = JSON.parse(localStorage.getItem("calendar"));
		let base = this;
      axios.post("/calendar/editone", {
        eventObj: eventObj,
        user: this.props.user,
        calendarId: currentCalendar._id
      }).then(response =>{
      	//console.log(response.data);

			//-- update the calendar state
			let calendar = base.state.calendar.slice();
			calendar.forEach( (c) => {
				if ((c.events.id && c.events.id===eventObj.id) || (c.events._id && c.events._id===eventObj.id )) {
					eventObj.copyTo(c.events);
				}
			});
			base.setState({calendar: calendar});
			//TODO: revese lookup this link
			history.push("/")
      }).catch(err=>{
        console.log('backend error with edit',err);
      });
    }

    handleDeleteEvent = (eventObj, history) => {
      let base = this;
      let currentCalendar = JSON.parse(localStorage.getItem("calendar"));
		//-- embarrassing
      let eventId = eventObj._id || eventObj.id;
      let currentUser = this.props.user;

      axios.post('/calendar/event/delete',{
        calendarId: currentCalendar._id,
        eventId: eventId,
        userId: currentUser.id
      }).then(response =>{
        console.log(response);
         //--refresh view
			let calendar = base.state.calendar.slice();
			let arr=[];
			calendar.forEach( (c) => {
				if ((c.events.id && c.events.id!==eventObj.id) || (c.events._id && c.events._id!==eventObj.id )) {
					arr.push(c);
				}
			});
			calendar=arr;
			console.log(calendar);
			base.setState({calendar: calendar});

			//TODO: revese lookup this link
			history.push("/");
      }).catch(err=>{
        console.log('DB Error delete ',err);
      });
    }

    editCalName = (event) => {
      event.preventDefault();
      let base = this;
      let currentUser = this.props.user;
      let name = this.state.calName;
      let currentCalendar = JSON.parse(localStorage.getItem('calendar'));
      axios.post('/calendar/editName',{
        user: currentUser,
        calendar: currentCalendar._id,
        name: name
      }).then(response => {
        console.log(response.data);
        this.props.onClickEventAction(0);
      }).catch(err => {
        console.log('err editing calendar - '+err);
      });
    }

    addCalendar = (event) => {
      event.preventDefault();
      let base = this;
      let currentUser = this.props.user;
      let name = this.state.calName;
      axios.post('/calendar/add',{
        user: currentUser,
        name: name
      }).then(response => {
        console.log(response.data);
      }).catch(err=> {
        console.log('err adding calendar - '+err);
      });
    }

    addContributors = (event) => {
        event.preventDefault();
        let base = this;
        let email = this.state.email;
        let currentUser = this.props.user;
        let permission = this.state.permission;
        let currentCalendar = JSON.parse(localStorage.getItem("calendar"));
        axios.post('/calendar/edit',{
            user: currentUser,
            calendarId: currentCalendar._id,
            email: email,
            permission: permission
        }).then(response => {
            console.log(response.data);
            this.props.onClickEventAction(0);
        }).catch(err => {
            console.log('backend error with change database and send', err);
        });
    }

	 renderMainCal = ()=> {
		 return (
			 <div className="main-page">
				 <Row nogutter>
					 <Col sm={8}>
						 <Month viewDate={this.state.viewDate} currentDate={this.state.currentDate} clickChangeDay={this.clickChangeDay} calendar={this.state.calendar}/>
					 </Col>
					 <Col sm={4}>
						 <Day deleteEvent={(o)=>this.props.onClickEventAction(6,o)} viewDate={this.state.viewDate} currentDate={this.state.currentDate} calendar={this.state.calendar} handlePriorityChange={(event)=>this.handlePriorityChange(event)} handleEventNameChange={(event) => this.handleEventNameChange(event)} onClickEditDayEvent={this.onClickEditDayEvent} handleChange={this.handleEditEventChange} handleTypeChange={(event)=>this.handleTypeChange(event)} />
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


  render() {

      if(!this.props.user){
 			return (
				<div className="main-no-user"><h1>Please login or signup.</h1></div>
			);
      }

      return (
        <div className="main-home">
				<Route path="/event/add" render = {
					() => (<AddEvent viewDate={this.state.viewDate} addEvent={this.addEvent} eventToEdit={new EventObject()} />
				)} />
				<Route path="/event/edit" render={
					 () => (<EditEvent editEvent={this.editEvent} eventToEdit={this.state.eventToEdit} />
				)} />
				<Route path="/event/delete" render={
					() => (<DeleteEvent onClickDelete={this.handleDeleteEvent} eventObject={this.props.eventObject}/>
				)} />
				<Route path="/calendar/holidays" render = {
					() => (<AddHoliday countryCode={this.state.countryCode} addHolidays={this.addHolidays} />
				)} />
				<Route path="/calendar/edit" render={
					() => (<EditCalendar editCal={this.editCalName} name={this.state.calName} handleName={event => this.handleNameChange(event)} />
				)} />
				<Route path="/calendar/contributor" render = {
					() => (<AddContributor editCal={this.addContributors} handlePermChange={event => this.handlePermissionChange(event)} handleChange={event => this.handleEmailChange(event)} permission={this.state.permission} email={this.state.email} />
				)} />
				<Route path="/calendar/add" render={
					() => (<AddCalendar addCal={this.addCalendar} handleName={event => this.handleNameChange(event)} />
				)} />
				<Route exact path="/" render={this.renderMainCal} />
        </div>
      );
   }

}

export default Main;
