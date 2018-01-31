import React, { Component } from 'react';
import { Row, Col } from "react-grid-system";
import Holidays from 'date-holidays';
const hd = new Holidays();

class CountryCodes extends Component {
    constructor(props){
        super(props);
    }

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
            </div>
        );
    }
}

export default CountryCodes;