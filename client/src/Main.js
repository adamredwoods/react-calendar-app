import React, { Component } from 'react';
import './css/Main.css';
import Month from './calendar/Month.js';
import Week from './calendar/Week.js';
import Day from './calendar/Day.js';

class Main extends Component {
  render(){
    return (
        <div className="main-page">
          <Month />
          <Week />
          <Day />
        </div>
      );
  }
}

export default Main;
