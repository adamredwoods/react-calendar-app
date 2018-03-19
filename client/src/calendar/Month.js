import React, { Component } from 'react';
import '../css/Month.css';
import DaysOfMonth from './DaysOfMonth.js';
import MonthHeader from './MonthHeader.js';




const Month = (props) => {
        return (
            <div className="month-container">
                <MonthHeader viewDate={props.viewDate} clickChangeDay={props.clickChangeDay}/>
                <DaysOfMonth currentDate={props.currentDate} viewDate={props.viewDate} onClickDay={props.clickChangeDay} calendarEvents={props.calendarEvents} calendar={props.calendar}/>
            </div>
        );
    }


export default Month;
