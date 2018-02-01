import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-grid-system';
import Holidays from 'date-holidays';
import CountryCodes from './helper/CountryCodes.js';
import EditCalendar from './helper/EditCalendar.js';
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
            menuToggle: 0,
            email: '',
            permission: 'view',
            name: ''
        }
        this.handleCountryCodeChange = this.handleCountryCodeChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePermissionChange = this.handlePermissionChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleCountryCodeChange(event) {
        this.setState({countryCode: event.target.value}, () => {
            let holidays = new Holidays(this.state.countryCode);
            let allHolidays = holidays.getHolidays(this.state.currentYear);
            this.setState({currentYearHolidays: allHolidays});
        });
    }

    handleNameChange = (event) => {
        this.setState({name: event.target.value});
    }

    handleEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    handlePermissionChange = (event) => {
        this.setState({permission: event.target.value});
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
        let email = this.state.email;
        let currentUser = this.props.user;
        let permission = this.state.permission;
        let name = this.state.name;
        let currentCalendar = JSON.parse(localStorage.getItem("calendar"));
        axios.post('/calendar/edit',{
            user: currentUser,
            calendar: currentCalendar,
            email: email,
            permission: permission,
            name: name
        }).then(response => {
            console.log(response.data);
        }).catch(err => {
            console.log('backend error with change database and send', err);
        });
    }


    render(){
      let c= (this.props.showMenu===true) ? "menu-page action-slide-out" : "menu-page action-slide-in";

        return (
            <div className={c}>
               <div className="menu-button" onClick={this.props.onClickToggleMenu}>&lt;</div>
                <CountryCodes countryCode={this.state.countryCode} handleChange={event => this.handleCountryCodeChange(event)} addHolidays={this.addHolidays} />
                <div className="menu-spacer"></div>
                <a className="menu-topitem" href="#"><div className="menu-item" id="1">Edit<EditCalendar handlePermChange={event => this.handlePermissionChange(event)} handleChange={event => this.handleEmailChange(event)} permission={this.state.permission} email={this.state.email} editCal={this.editCal} name={this.state.name} handleName={event => this.handleNameChange(event)}/></div></a>
                <a className="menu-topitem" href="#"><div className="menu-item" id="2">Item 2</div></a>
                <a className="menu-topitem" href="#"><div className="menu-item" id="3">Item 3</div></a>
                <div className="menu-spacer"></div>
            </div>
        );
    }
}

export default Menu;