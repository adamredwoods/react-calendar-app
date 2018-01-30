import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "date-format-lite";
import "../css/Month.css";

class MonthHeader extends Component {
   constructor(props) {
      super(props);
      this.state = {
         newViewDate: null
      }
   }

  render() {

     let date = this.props.viewDate;
     if (!date) date="";

    return (
      <Row>


            <Col sm={1}>Arr Left</Col>
            <Col sm={10}><div className="month-header">{date.date("MMMM")} / {date.date("YYYY")} </div></Col>
            <Col sm={1}>Arr right</Col>


      </Row>
    );
  }
}

export default MonthHeader;
