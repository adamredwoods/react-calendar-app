import React, { Component } from 'react';
import { Row, Col } from 'react-grid-system';
import Holidays from 'date-holidays';
import CountryCodes from './helper/CountryCodes.js';
const hd = new Holidays();

class Menu extends Component {
    constructor(props){
        super(props)
        this.state = {
            countryCode: 'US',
            currentYear: '2018',
            currentYearHolidays: []
        }
        this.handleCountryCodeChange = this.handleCountryCodeChange.bind(this);
    }

    handleCountryCodeChange(event) {
        this.setState({countryCode: event.target.value}, () => {
            let holidays = new Holidays(this.state.countryCode);
            let allHolidays = holidays.getHolidays(this.state.currentYear);
            this.setState({currentYearHolidays: allHolidays});
        });
    }

    render(){
        return(
            <div className="menu-page">
                <CountryCodes countryCode={this.state.countryCode} handleChange={(event) => this.handleCountryCodeChange(event)}/>
            </div>
        );
    }
}

export default Menu;