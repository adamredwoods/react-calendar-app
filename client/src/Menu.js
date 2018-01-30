import React, { Component } from 'react';
import { Row, Col } from 'react-grid-system';
import Holidays from 'date-holidays';
import CountryCodes from './helper/CountryCodes.js';
const hd = new Holidays();

class Menu extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    render(){
        return(
            <div className="menu-page">
                <CountryCodes />
            </div>
        );
    }
}

export default Menu;