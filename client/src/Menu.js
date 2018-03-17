import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-grid-system';
import "./css/Menu.css";
import {Redirect, Link} from 'react-router-dom';


class Menu extends Component {
    constructor(props){
        super(props)
        this.state = {
            menuClass: "menu-page",
            menuToggle: 1,
        }
    }

    onClickEvent = (e) => {

      this.setState({menuToggle: 1-this.state.menuToggle});
		this.props.onClickToggleMenu(-1);
      //this.props.onClickEventAction(e.target.id);
   }


    render(){
      let c= (this.props.showMenu===true) ? "menu-page action-slide-out" : "menu-page action-slide-in";

		return (
		   <div className={c}>
		      <div className="menu-button" onClick={this.props.onClickToggleMenu}>&lt;</div>
		       <div className="menu-spacer"></div>
		       <Link className="menu-topitem" to="/calendar/edit" onClick={this.onClickEvent}><div className="menu-item" id="1">Edit Calendar</div></Link>
		       <Link className="menu-topitem" to="/event/add" onClick={this.onClickEvent}><div className="menu-item" id="2">Add Event</div></Link>
		       <Link className="menu-topitem" to="/calendar/contributor" onClick={this.onClickEvent}><div className="menu-item" id="3">Add Contributor</div></Link>
		       <Link className="menu-topitem" to="/calendar/holidays" onClick={this.onClickEvent}><div className="menu-item" id="4">Add Holidays</div></Link>
		       <Link className="menu-topitem" to="/calendar/add" onClick={this.onClickEvent}><div className="menu-item" id="7">Add New Calendar</div></Link>
		       <div className="menu-spacer"></div>
		   </div>
		);
    }
}

export default Menu;
