import React, { Component } from 'react';
import Foundation from 'react-foundation';
import '../css/Month.css';
import DaysOfMonth from './DaysOfMonth.js';
import MonthHeader from './MonthHeader.js';



class Month extends Component { 
    render(){
        return (
            <div className="month-container">
                <MonthHeader />
                <DaysOfWeek />
                <DaysOfMonth />
            </div>
        );
        const DaysOfWeek = () => {
            return (
                <div className="days-of-week">
                    M T W R F Sa Su
                </div>
            );
        }
    }
}

export default Month;