import React, { Component } from "react";
import "../css/Month.css";

class MonthHeader extends Component {
  render() {
    return (
      <div className="month-header">
         <Col lg={4} sm={1}>Arr Left</Col>
         <Col lg={4} sm={10}>(Month/Year)</Col>
         <Col lg={4} sm={1}>Arr right</Col>
      </div>
    );
  }
}

export default MonthHeader;
