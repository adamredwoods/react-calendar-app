import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-grid-system';
import Holidays from 'date-holidays';
import CountryCodes from './helper/CountryCodes.js';
import "./css/Menu.css";
const hd = new Holidays();

class Menu extends Component {
    constructor(props){
        super(props)
        this.state = {
            countryCode: 'US',
            currentYear: '2018',
            currentYearHolidays: [],
            menuClass: "menu-page",
            menuToggle: 0
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
            console.log(response)
        }).catch(err => {
            console.log('backend error we hope', err)
        })
	}

   onClickToggleMenu = (e) => {
      let c= (this.state.menuToggle===0) ? "menu-page action-slide-out" : "menu-page action-slide-in";
      this.setState({menuClass: c, menuToggle: 1-this.state.menuToggle});
   }

    render(){
        return (
            <div className={this.state.menuClass}>
               <div className="menu-button" onClick={this.onClickToggleMenu}>&lt;</div>
                <CountryCodes countryCode={this.state.countryCode} handleChange={event => this.handleCountryCodeChange(event)} addHolidays={this.addHolidays} />
                <div className="menu-spacer"></div>
                <a className="menu-topitem" href="#"><div className="menu-item" id="1">Item 1</div></a>
                <a className="menu-topitem" href="#"><div className="menu-item" id="2">Item 2</div></a>
                <a className="menu-topitem" href="#"><div className="menu-item" id="3">Item 3</div></a>
                <div className="menu-spacer"></div>
            </div>
        );
    }
}

export default Menu;
