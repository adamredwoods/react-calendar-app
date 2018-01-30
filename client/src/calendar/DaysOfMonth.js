import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import Day from "Day.js";
import "../css/Month.css";

class DaysOfMonth extends Component {

   findDayOne(currentDate) {
      let dayOne = 0;

      return dayOne;
   }

   render() {
      return (
      <div className="days-in-month">
         <Row>
            <Col sm={1}></Col>
            <Col sm={8}>

            </Col>
            <Col sm={3}></Col>
         </Row>
      </div>
      )
   }
}

export default DaysOfMonth;
