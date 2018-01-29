import React, { Component } from 'react';
import './css/Main.css';
import Month from './calendar/Month.js';
import Week from './calendar/Week.js';
import Day from './calendar/Day.js';

class Main extends Component {
  render(){
    let mainCal = <div />
    if(this.props.user){
      mainCal = <div className="main-page"><Month /><Week /><Day /></div>
    }else{
      mainCal = <div className="main-no-user"><h1>Log in</h1></div>
    }
    return (
        <div className="main-home">
          {mainCal}
        </div>
      );
  }
}

export default Main;
