import React, { Component } from 'react';
import './css/Event.css';
import Month from './calendar/Month.js';
import Week from './calendar/Week.js';
import Day from './calendar/Day.js';
import { Row, Col, Hidden, ClearFix } from 'react-grid-system';
import "date-format-lite";


class AddEvent extends Component {

   onClickCancel = (e) => {
      this.props.onClickEventAction(0);
   }

   render() {
      return(
         <div>
            <div>EVENT ADD</div>
            <div onClick={this.onClickCancel}>cancel</div>
         </div>
      );
   }
}

export {AddEvent};
