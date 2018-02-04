import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import "date-format-lite";
import "../css/Month.css";
import "../css/ButtonsAndMore.css";

class MonthHeader extends Component {
   constructor(props) {
      super(props);
      this.state = {
         newViewDate: null
      }
   }

   onClickChangeMonth = (e) => {
      let newDate = "";
      let m=parseInt(this.props.viewDate.date("MM"));
      let y=parseInt(this.props.viewDate.date("YYYY"));
      if(e.target.id==1) {
         m--;
         if (m<1) {
            m=12;
            y--;
         }
      } else {
         m++;
         if (m>12) {
            m=1;
            y++;
         }
      }
      newDate = (y+"-"+m+"-"+this.props.viewDate.date("DD")).date();
      this.props.clickChangeDay(newDate);
   }

  render() {

     let date = this.props.viewDate;
     if (!date) date="";

    return (
      <div className="header-container">
         <Row>
            <Col xs={4} style={{textAlign:"right"}}><span className="btn-circle" id="1" onClick={this.onClickChangeMonth}>&lt;</span></Col>
            <Col xs={4}>

               <span className="month-header">{date.date("MMMM")} {date.date("YYYY")} </span>

            </Col>
            <Col xs={4} style={{textAlign:"left"}}><span className="btn-circle" id="2" onClick={this.onClickChangeMonth}>&gt;</span></Col>
         </Row>
      </div>
    );
  }
}

export default MonthHeader;
