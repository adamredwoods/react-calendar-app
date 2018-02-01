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
            menuClass: "menu-page",
            menuToggle: 0,
        }
    }

    onClickEvent = (e) => {
      this.props.onClickEventAction(e.target.id);
   }


    render(){
      let c= (this.props.showMenu===true) ? "menu-page action-slide-out" : "menu-page action-slide-in";

        return (
            <div className={c}>
               <div className="menu-button" onClick={this.props.onClickToggleMenu}>&lt;</div>
                <div className="menu-spacer"></div>
                <a className="menu-topitem" href="#" onClick={this.onClickEvent}><div className="menu-item" id="1">Edit Calendar</div></a>
                <a className="menu-topitem" href="#" onClick={this.onClickEvent}><div className="menu-item" id="2">Add Event</div></a>
                <a className="menu-topitem" href="#" onClick={this.onClickEvent}><div className="menu-item" id="3">Add Contributor</div></a>
                <a className="menu-topitem" href="#" onClick={this.onClickEvent}><div className="menu-item" id="4">Add Holidays</div></a>
                <div className="menu-spacer"></div>
            </div>
        );
    }
}

export default Menu;
