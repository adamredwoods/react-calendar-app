import React, { Component } from 'react';
import './css/Event.css';
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
         <div>
            <div>EVENT ADD</div>
            <div onClick={this.onClickCancel}>cancel</div>
         </div>
      );
   }
}

class AddHoliday extends Component {
    render(){
        let countries = {};
        countries = hd.getCountries();
        var defaultOption = <option value="US" selected>Select a Country</option>;
        var firstOption = <option value="US">United States of America</option>;
        var countryOptions = [defaultOption, firstOption];
        for(var country in countries){
            countryOptions.push(
                <option value={country}>{countries[country]}</option>
            );
        }
        return (
            <div className="country-codes-form">
                <form name="Country Code" onSubmit={this.props.addHolidays}>
                    <select value={this.props.countryCode} onChange={this.props.handleChange}>
                        {countryOptions}
                    </select>
                    <input type="submit" value="Add Holidays" />
                </form>
                <div onClick={this.onClickCancel}>cancel</div>
            </div>
        );
    }
}

class AddContributor extends Component {
    render(){
        let currentCalendar = JSON.parse(localStorage.getItem("calendar"));
        return(
            <div className="form edit-form">
                <form name="Edit Contributors" onSubmit={this.props.editCal}>
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
            </div>
        );
    }
}

class EditCalendar extends Component {
    render(){
        let currentCalendar = JSON.parse(localStorage.getItem("calendar"));
        return(
            <div className="form edit-form">
                <form name="Edit Calendar" onSubmit={this.props.editCal}>
                    <div className="form-field-container">
                        <label name="Calendar Name" />
                        <input className="form-field" onChange={this.props.handleName} type="text" value={this.props.name} />
                    </div>
                    <input type="submit" value="Edit Calendar" />
                </form>
            </div>
        );
    }
}

export {AddEvent,AddHoliday,AddContributor,EditCalendar};
