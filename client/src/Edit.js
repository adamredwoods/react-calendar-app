import React, { Component } from 'react';
import './css/Event.css';
import './css/ButtonsAndMore.css';
import Month from './calendar/Month.js';
import Week from './calendar/Week.js';
import Day from './calendar/Day.js';
import { Row, Col, Hidden, ClearFix } from 'react-grid-system';
import "date-format-lite";
import Holidays from 'date-holidays';
const hd = new Holidays();


class AddEvent extends Component {
   onClickCancel = (e) => {
      this.props.onClickEventAction(0);
   }

   render() {
       let currentCalendar = JSON.parse(localStorage.getItem("calendar"));
      return(
         <div className="nice-form-div">
            <form name="Add Event" className="nice-form" onSubmit={this.props.addEvent} >
                <h3>Event Name</h3>
                <input type="text" name="eventName" onChange={this.props.handleChange} value={this.props.name}/>
                <h4>Start Date</h4>
                <input type="date" name="eStartDate" onChange={this.props.handleChange} value={this.props.startDate} />
                <h5>Start Time</h5>
                <input type="time" name="eStartTime" onChange={this.props.handleChange} value={this.props.startTime} />
                <h4>End Date</h4>
                <input type="date" name="eEndDate" onChange={this.props.handleChange} value={this.props.endDate} />
                <h5>End Time</h5>
                <input type="time" name="eEndTime" onChange={this.props.handleChange} value={this.props.endTime} />
                <select value={this.props.eventType} onChange={this.props.handleTypeChange} name="Event Type">
                    <option value="1">Meeting</option>
                    <option value="2">Work</option>
                    <option value="3">Appointment</option>
                    <option value="4">Birthday</option>
                    <option value="0">Holiday</option>
                </select>
                <select value={this.props.priority} onChange={this.props.handlePriorityChange} name="Event Priority">
                    <option value="0">Lowest Priority</option>
                    <option value="1">Low Priority</option>
                    <option value="2">Medium Priority</option>
                    <option value="3">High Priority</option>
                    <option value="4">Highest Priority</option>
                </select>
                <div className="margin-top-50">
                <input type="submit" value="Add Event" />
                </div>
            </form>
            <div className="btn outline margin-10" onClick={this.onClickCancel}>cancel</div>
         </div>
      );
   }
}

class EditEvent extends Component {
   constructor(props){
      super(props);
      this.state = {
         eventName: "",
         eStartDate: "",
         eStartTime: "",
         eEndDate: "",
         eEndTime: "",
         eventType: 0,
         priority: 0
      }
   }
   onClickCancel = (e) => {
      this.props.onClickEventAction(0);
   }

   componentDidMount() {
      let cc = JSON.parse(localStorage.getItem("currentEvent"));

      this.setState({
         _id: cc._id,
         eventName: cc.name,
         startDate: cc.startDate,
         startTime: cc.startTime,
         endDate: cc.endDate,
         endTime: cc.endTime,
         eventTypeId: cc.eventTypeId,
         priority: cc.priority
      });
   }

   editCurrentEvent = (e) => {
       e.preventDefault();
       let eventObj = this.state;
       this.props.editEvent(eventObj);
   }

   handleChange = (e) => {
      this.setState({[e.target.name]: e.target.value});
   }

   handleTypeChange = (event) => {
     this.setState({eventType: event.target.value})
   }

   render() {

      if(!this.state.startDate) {
            return (<div></div>);
      }

      let startDate = this.state.startDate.date('YYYY-MM-DD');
      let endDate = this.state.endDate.date('YYYY-MM-DD');

      return(
         <div className="nice-form-div">
            <form name="Edit Event" className="nice-form" onSubmit={this.editCurrentEvent} >
                <h3>Event Name</h3>
                <input type="text" name="eventName" onChange={this.handleChange} value={this.state.eventName}/>
                <h4>Start Date</h4>
                <input type="date" name="startDate" onChange={this.handleChange} value={startDate} />
                <h5>Start Time</h5>
                <input type="time" name="startTime" onChange={this.handleChange} value={this.state.startTime} />
                <h4>End Date</h4>
                <input type="date" name="endDate" onChange={this.handleChange} value={endDate} />
                <h5>End Time</h5>
                <input type="time" name="endTime" onChange={this.handleChange} value={this.state.endTime} />
                <select value={this.state.eventTypeId} onChange={this.handleTypeChange} name="eventTypeId">
                    <option value="1">Meeting</option>
                    <option value="2">Work</option>
                    <option value="3">Appointment</option>
                    <option value="4">Birthday</option>
                    <option value="0">Holiday</option>
                </select>
                <select value={this.state.priority} onChange={this.props.handlePriorityChange} name="eventPriority">
                    <option value="0">Lowest Priority</option>
                    <option value="1">Low Priority</option>
                    <option value="2">Medium Priority</option>
                    <option value="3">High Priority</option>
                    <option value="4">Highest Priority</option>
                </select>
                <div className="margin-top-50">

                <input type="hidden" value={this.state._id} />
                <input type="submit" value="Edit Event" />
                </div>
            </form>
            <div className="btn outline margin-10" onClick={this.onClickCancel}>cancel</div>
         </div>
      );
   }
}

class AddHoliday extends Component {
    onClickCancel = (e) => {
      this.props.onClickEventAction(0);
   }
    render(){
        let countries = {};
        countries = hd.getCountries();
        var defaultOption = <option selected>Select a Country</option>;
        var firstOption = <option value="US">United States of America</option>;
        var countryOptions = [defaultOption, firstOption];
        for(var country in countries){
            countryOptions.push(
                <option value={country}>{countries[country]}</option>
            );
        }
        return (
            <div className="country-codes-form nice-form-div">
                <form name="Country Code" className="nice-form" onSubmit={this.props.addHolidays}>
                    <select value={this.props.countryCode} onChange={this.props.handleChange}>
                        {countryOptions}
                    </select>
                    <input type="submit" value="Add Holidays" />
                </form>
                <div className="btn outline margin-10" onClick={this.onClickCancel}>cancel</div>
            </div>
        );
    }
}

class AddContributor extends Component {
    onClickCancel = (e) => {
      this.props.onClickEventAction(0);
   }
    render(){
        let currentCalendar = JSON.parse(localStorage.getItem("calendar"));
        return(
            <div className="form edit-form nice-form-div">
                <form name="Edit Contributors" className="nice-form" onSubmit={this.props.editCal}>
                    <div className="form-field-container">
                        <label name="Add Contributor by Email" />
                        <input className="form-field" type="text" onChange={this.props.handleChange} value={this.props.email} />
                    </div>
                    <div className="form-field-container">
                        <select value={this.props.permission} onChange={this.props.handlePermChange}>
                            <option value="edit">Can Edit</option>
                            <option value="view">View Only</option>
                        </select>
                    </div>
                    <input type="submit" value="Edit Contributors" />
                </form>
                <div className="btn outline margin-10" onClick={this.onClickCancel}>cancel</div>
            </div>
        );
    }
}

class EditCalendar extends Component {
    onClickCancel = (e) => {
      this.props.onClickEventAction(0);
   }
    render(){
        console.log('we tried to render edit cal');
        let currentCalendar = JSON.parse(localStorage.getItem("calendar"));
        return(
            <div className="form edit-form nice-form-div">
                <form name="Edit Calendar" className="nice-form" onSubmit={this.props.editCal}>
                    <div className="form-field-container">
                        <label name="Calendar Name" />
                        <input className="form-field" onChange={this.props.handleName} type="text" value={this.props.name} />
                    </div>
                    <input type="submit" value="Edit Calendar" />
                </form>
                <div className="btn outline margin-10" onClick={this.onClickCancel}>cancel</div>
            </div>
        );
    }
}

export {AddEvent,AddHoliday,AddContributor,EditCalendar,EditEvent};
