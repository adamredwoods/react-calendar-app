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
   onClickCancel = (e) => {
      this.props.onClickEventAction(0);
   }

   render() {
    let currentEvent = JSON.parse(localStorage.getItem('currentEvent'));  
    let startDate = currentEvent.startDate.date('YYYY-MM-DD');
    let endDate = currentEvent.endDate.date('YYYY-MM-DD');
    //let currentCalendar = JSON.parse(localStorage.getItem("calendar"));
      return(
         <div className="nice-form-div">
            <form name="Edit Event" className="nice-form" onSubmit={this.props.editEvent} >
                <h3>Event Name</h3>
                <input type="text" name="eventName" onChange={this.props.handleChange} value={currentEvent.name}/>
                <h4>Start Date</h4>
                <input type="date" name="eStartDate" onChange={this.props.handleChange} value={startDate} />
                <h5>Start Time</h5>
                <input type="time" name="eStartTime" onChange={this.props.handleChange} value={currentEvent.startTime} />
                <h4>End Date</h4>
                <input type="date" name="eEndDate" onChange={this.props.handleChange} value={endDate} />
                <h5>End Time</h5>
                <input type="time" name="eEndTime" onChange={this.props.handleChange} value={currentEvent.endTime} />
                <select value={currentEvent.eventType} onChange={this.props.handleTypeChange} name="Event Type">
                    <option value="1">Meeting</option>
                    <option value="2">Work</option>
                    <option value="3">Appointment</option>
                    <option value="4">Birthday</option>
                    <option value="0">Holiday</option>
                </select>
                <select value={currentEvent.priority} onChange={this.props.handlePriorityChange} name="Event Priority">
                    <option value="0">Lowest Priority</option>
                    <option value="1">Low Priority</option>
                    <option value="2">Medium Priority</option>
                    <option value="3">High Priority</option>
                    <option value="4">Highest Priority</option>
                </select>
                <div className="margin-top-50">
                {console.log(currentEvent._id)}
                {console.log('helllloooooo')}
                {console.log(currentEvent)}
                <input type="hidden" value={currentEvent._id} />
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
