import React, { Component } from 'react';
import '../css/Edit.css';
import '../css/ButtonsAndMore.css';
import { Row, Col, Hidden, ClearFix } from 'react-grid-system';
import "date-format-lite";
import MiniCalendarPicker from "../helper/MiniCalendarPicker";
import Holidays from 'date-holidays';
import CountryCodes from '../helper/CountryCodes.js';

const hd = new Holidays();


//TODO: functional component
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

export default AddHoliday;
