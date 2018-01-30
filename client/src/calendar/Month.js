import React, { Component } from 'react';
import '../css/Month.css';
import DaysOfMonth from './DaysOfMonth.js';
import MonthHeader from './MonthHeader.js';



class Month extends Component {
    render(){
        return (
            <div className="month-container">
                <MonthHeader />
                <DaysOfMonth currentDate={this.props.currentDate} viewDate={this.props.viewDate}/>
            </div>
        );
    }
}

export default Month;
