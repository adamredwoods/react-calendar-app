import React, { Component } from 'react';
import { Row, Col } from "react-grid-system";
import Holidays from 'date-holidays';
const hd = new Holidays();

class CountryCodes extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    render(){
        let countries = {};
        countries = hd.getCountries();
        var countryOptions = [];
        for(var country in countries){
            countryOptions.push(<option value={country}>{countries[country]}</option>);
        }
        console.log('country codes: '+countryOptions);
        return (
            <div className="country-codes-form">
                <form name="Country Code">
                    <select>
                        {countryOptions}
                    </select>
                </form>
            </div>
        );
    }
}

export default CountryCodes;