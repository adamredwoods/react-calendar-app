import React, { Component } from 'react';
import {Route} from 'react-router';
import {Link, Redirect} from 'react-router-dom';
import '../css/Edit.css';
import '../css/ButtonsAndMore.css';
import { Row, Col, Hidden, ClearFix } from 'react-grid-system';
import "date-format-lite";
import MiniCalendarPicker from "../helper/MiniCalendarPicker";
import Holidays from 'date-holidays';
import EventObject from '../event/EventObject.js';


class EditEvent extends Component {
   constructor(props){
      super(props);
      this.state = {
         name: "",
         startDate: "",
         startTime: "",
         endDate: "",
         endTime: "",
         eventType: 0,
         priority: 0,
			id: ""
      }

   }


   componentDidMount() {
      // let cc = JSON.parse(localStorage.getItem("currentEvent"));
		let cc = this.props.eventToEdit;

		if (cc) {
	      this.setState({
	         id: cc.id,
	         name: cc.name,
	         startDate: cc.startDate,
	         startTime: cc.startTime,
	         endDate: cc.endDate,
	         endTime: cc.endTime,
	         eventType: cc.eventType,
	         priority: cc.priority,
	         error: null
	      });
		}
   }

   editCurrentEvent = (e, history) => {
       e.preventDefault();
       if(this.state.startDate.date('U') > this.state.endDate.date('U')){
            this.setState({error: 'Uh oh! Before submitting, please enter a start date that is prior to your end date!'});
       }else{
            let eventObj = new EventObject(this.state);
				eventObj.setId(this.state._id);
				//-- pass history back to parent to call page change after backend updates
            this.props.editEvent(eventObj, history);
       }
   }

   handleChange = (e) => {
      this.setState({[e.target.name]: e.target.value, error: null});
   }

   handleTypeChange = (event) => {
     this.setState({eventTypeId: event.target.value});
   }


   render() {
       let errorMessage;
        if(this.state.error){
            errorMessage = (
                <div className="error-message">
                    <h3>{this.state.error}</h3>
                </div>
            );
        }else{
            errorMessage;
        }

      if(!this.props.eventToEdit) {
            return (<Redirect to="/" />);
      }

      let startDate = this.state.startDate.date('YYYY-MM-DD');
      let endDate = this.state.endDate.date('YYYY-MM-DD');

      return (
			<Route render={({history}) => (
				<div className="nice-form-div">
				    <form name="Edit Event" className="nice-form" onSubmit={(event)=> (this.editCurrentEvent(event,history))}>
				      <h3>Event Name</h3>
				      <input type="text" name="eventName" onChange={this.handleChange} value={this.state.name} />
						<h5>Start Time</h5>
						<input type="time" name="startTime" onChange={this.handleChange} value={this.state.startTime} />
				      <h4>Start Date</h4>
				      <input type="date" name="startDate" onChange={this.handleChange} value={startDate} />
				      <div className="spacer-30" />
				      <MiniCalendarPicker name="startDate" onClick={this.handleChange} value={startDate} />


						<h5>End Time</h5>
						<input type="time" name="endTime" onChange={this.handleChange} value={this.state.endTime} />
				      <h4>End Date</h4>
				      <input type="date" name="endDate" onChange={this.handleChange} value={endDate} />
				      <div className="spacer-30" />
				      <MiniCalendarPicker name="endDate" onClick={this.handleChange} value={endDate} />
						<hr />
						<div>
				        <select value={this.state.eventType} onChange={this.handleChange} name="eventType">
				          <option value="1">Meeting</option>
				          <option value="2">Work</option>
				          <option value="3">Appointment</option>
				          <option value="4">Birthday</option>
				          <option value="0">Holiday</option>
				        </select>
				        <select value={this.state.priority} onChange={this.handleChange} name="priority">
				          <option value="0">Lowest Priority</option>
				          <option value="1">Low Priority</option>
				          <option value="2">Medium Priority</option>
				          <option value="3">High Priority</option>
				          <option value="4">Highest Priority</option>
				        </select>
				      </div>
				      <div className="margin-top-50">
				        <input type="hidden" value={this.state._id} />
				        <input type="submit" value="Submit" />
				      </div>
				    </form>
				    <Link className="btn outline margin-10" to="/">
				      cancel
				    </Link>
				    {errorMessage}
				</div>
			)} />
      );
   }
}


export default EditEvent;
