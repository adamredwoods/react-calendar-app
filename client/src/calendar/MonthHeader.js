import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "../css/Month.css";

class MonthHeader extends Component {
   constructor(props) {
      super(props);
      this.state = {
         newViewDate: null
      }
   }

  render() {
    return (
      <div className="month-header">
         <Row>
            <Col lg={4} sm={1}>Arr Left</Col>
            <Col lg={4} sm={10}>(Month/Year)</Col>
            <Col lg={4} sm={1}>Arr right</Col>
         </Row>
      </div>
    );
  }
}

export default MonthHeader;
