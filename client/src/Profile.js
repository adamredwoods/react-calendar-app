import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import { Row, Col } from 'react-grid-system';
import './css/App.css';


class ProfileCalendar extends Component {
  render(){
    return(
        <div className="calendar-div" onClick={(e) => (this.props.onClickShowCal(this.props.calObj))}>
          {this.props.calObj.name}
        </div>
    );
  }
}

class Profile extends Component {
  constructor(props){
    super(props);
    this.state={
      calendar: {},
      clicked: true
    }
  }
  componentDidMount = () => {
      let user=this.props.user;
      // let calendar = this.state.calendar;
      axios.post('/calendar/all',{
        user: user
      }).then(response => {
        //console.log(response.data);
          let calId = response.data.calendars[0].calendars.calendarId;
          axios.post('/calendar/oneCal',{
            calendarId: calId
          }).then(response => {
            //console.log(response.data);
            this.setState({calendar: response.data});
          }).catch(err=>{
            console.log(err);
          });
      }).catch(err => {
        console.log(err);
      });

    }
    handleCalClick = (e) => {
      this.setState({clicked: false});
    }

  render(){
    if(this.state.clicked){
      if(this.props.user && this.props.user.name){
        return (
          <div>
            <Row>
              <Col xs={12} s={12} m={6} l={6}>
              <div className="profile-left">
            <h2>{this.props.user.name}</h2>
            <h4>Email: {this.props.user.email}</h4>
            </div>
            </Col>
            <Col xs={12} s={12} m={6} l={6}>
            <div className="profile-right">
            <h4>Calendars: </h4>
            <div className="calendar-div">
              <h3>{this.state.calendar.name}</h3>
            </div>
            </div>
            </Col>
            </Row>
          </div>
        );
      }
    else {
      return (
        <p>This is a profile page. You need to be logged in to view it.</p>
      );
    }
  }else{
    <Redirect to="/" />
  }
}
}

export default Profile;
