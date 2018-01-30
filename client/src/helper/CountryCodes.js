import React, { Component } from 'react';
import { Row, Col } from "react-grid-system";
import Holidays from 'date-holidays';
const hd = new Holidays();

class CountryCodes extends Component {
    constructor(props){
        super(props);
        this.state = {
            countryCode: 'US'
        }
        this.handleCountryCodeChange = this.handleCountryCodeChange.bind(this);
    }

    handleCountryCodeChange(event) {
        this.setState({countryCode: event.target.value}, () => {
            let holidays = hd.init(this.state.countryCode);
            console.log('country code hols: '+holidays);
        });
    }

    render(){
        let countries = {};
        countries = hd.getCountries();
        var firstOption = <option value="US" selected>United States of America</option>;
        var countryOptions = [firstOption];
        for(var country in countries){
            countryOptions.push(
                <option value={country}>{countries[country]}</option>
            );
        }
        return (
            <div className="country-codes-form">
                <form name="Country Code">
                    <select value={this.state.countryCode} onChange={this.handleCountryCodeChange}>
                        {countryOptions}
                    </select>
                </form>
            </div>
        );
    }
}

export default CountryCodes;