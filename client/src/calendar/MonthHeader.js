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


            <Col sm={4} style={{textAlign:"right"}}><span className="button-round" >&lt;</span></Col>
            <Col sm={4}>

               <span className="month-header">{date.date("MMMM")} {date.date("YYYY")} </span>

            </Col>
            <Col sm={4} style={{textAlign:"left"}}><span className="button-round" >&gt;</span></Col>


      </Row>
    );
  }
}

export default MonthHeader;
