import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "../css/Month.css";

class DaysOfMonth extends Component {
  render() {
    return (
      <div className="days-in-month">
         <Row>
            <Col lg={4} sm={1}></Col>
            <Col lg={4} sm={10}>(28/30/31 days)</Col>
            <Col lg={4} sm={1}></Col>
         </Row>
      </div>
   )
  }
}

export default DaysOfMonth;
