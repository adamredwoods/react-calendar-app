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


            <Col sm={1}></Col>
            <Col sm={10}><span> &lt;-- </span><span className="month-header">{date.date("MMMM")} / {date.date("YYYY")} </span><span> --&gt; </span></Col>
            <Col sm={1}></Col>


      </Row>
    );
  }
}

export default MonthHeader;
