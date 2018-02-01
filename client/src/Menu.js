import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-grid-system';
import Holidays from 'date-holidays';
import CountryCodes from './helper/CountryCodes.js';
import EditCalendar from './helper/EditCalendar.js';
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

    addHolidays = (event) => {
        event.preventDefault();
        let base = this;
        let currentUser = this.props.user;
        let currentCalendar = JSON.parse(localStorage.getItem("calendar"));
        let currentYear = this.state.currentYear;
        let holidays = this.state.currentYearHolidays;
		axios.post('/calendar',{
            holidays: holidays,
            year: currentYear,
            user: currentUser,
            calendar: currentCalendar
        }).then(response => {
            localStorage.setItem('calendar', JSON.stringify(response.data.calendar));
        }).catch(err => {
            console.log('backend error we hope', err);
        });
    }
    
    editCal = (event) => {
        event.preventDefault();
        let base = this;
        let currentUser = this.props.user;
        let currentCalendar = JSON.parse(localStorage.getItem("calendar"));
        axios.post('/calendar/edit',{
            user: currentUser,
            calendar: currentCalendar
        }).then(response => {
            console.log(response.data);
        }).catch(err => {
            console.log('backend error with change database and send', err);
        });
    }

    render(){
        return (
            <div className="menu-page">
                <CountryCodes countryCode={this.state.countryCode} handleChange={event => this.handleCountryCodeChange(event)} addHolidays={this.addHolidays} />
                <EditCalendar editCal={this.editCal} />
            </div>
        );
    }
}

export default Menu;