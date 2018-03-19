import React, { Component } from 'react';
import {Route} from 'react-router';
import {Link, Redirect} from 'react-router-dom';
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
	constructor(props) {
		super(props);
		this.state = {
			countryCode: "",
			currentYear: 0,
			currentYearHolidays: []
		}
	}

	handleChange = (event) => {
		this.setState({countryCode: event.target.value}, () => {
		   let holidays = new Holidays(this.state.countryCode);
		   let allHolidays = holidays.getHolidays(this.state.currentYear);
		   this.setState({currentYearHolidays: allHolidays});
		});
	}

	submitHolidays = (e, history) => {
		e.preventDefault();
		this.props.addHolidays(this.state.currentYearHolidays);
		//TODO: reverse lookup
		history.push("/");
	}

	listHolidays = () => {
		let out=""
		 this.state.currentYearHolidays.map(function(h) {
			out+= ""+h.name+" "+h.date+"\n"
		})
		return out;
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
                <form name="Country Code" className="nice-form" >
                    <select value={this.state.countryCode} onChange={this.handleChange}>
                        {countryOptions}
                    </select>
						  <div className="margin-top-10">
						  		<textarea rows="10" cols="60" id="holiday-text-area" value={this.listHolidays()} readOnly></textarea>


						  </div>
						  <div className="margin-top-50">
						  		<Route render={({history}) => (
									<Link to="/" onClick={(e)=>this.submitHolidays(e,history)}><input type="submit" value="Add Holidays" /></Link>
								)} />
							</div>
                </form>
			 		 <Link className="btn outline margin-10" to="/">
		  				 cancel
					 </Link>
            </div>
        );
    }
}

export default AddHoliday;
