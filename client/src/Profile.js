import React, { Component } from 'react';
import axios from 'axios';

const allCals = [];

class ProfileCalendar extends Component {
  constructor(props){
    super(props);
    this.state={
      calObj: {}
    }
  }

  componentWillMount = () =>{
    this.setState({calObj: this.props.calObj});
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.calObj !== this.props.calObj){
      this.setState({calObj: nextProps.calObj});
    }
  }

  shouldComponentUpdate(nextProps,nextState){
    return this.props.calObj !== nextProps.calObj || nextState.calObj !== this.state.calObj;
  }

  render(){
    return(
      <li>
        <div className="calendar-div" onClick={(e) => (this.props.onClickShowCal(this.props.calObj))}>
          {this.state.calObj.name}
        </div>
      </li>
    );
  }
}

class Profile extends Component {
  constructor(props){
    super(props);
    this.state={
      calendars: []
    }
  }
  componentDidMount = () => {
      let user=this.props.user;
      // let calendar = this.state.calendar;
      axios.post('/calendar/all',{
        user: user
      }).then(response => {
        console.log(response.data);
          let calId = response.data.calendars[0].calendars.calendarId;
          axios.post('/calendar/oneCal',{
            calendarId: calId
          }).then(response => {
            console.log(response.data);
            allCals.push(response.data);
            console.log(allCals);
          }).catch(err=>{
            console.log(err);
          });
      }).catch(err => {
        console.log(err);
      });
      this.setState({calendars: allCals});
    }

  render(){
    let cals = this.state.calendars
    let allCalendars = cals.map((calObj)=>{
      return <ProfileCalendar onClick={this.props.onClickShowCal} calObj={calObj} />
    });
    if(this.props.user && this.props.user.name){
      return (
        <div>
          <h2>HELLO AGAIN {this.props.user.name}!</h2>
          <h4>Your email is {this.props.user.email}</h4>
        </div>
      );
    }
    else {
      return (
        <p>This is a profile page. You need to be logged in to view it.</p>
      );
    }
  }
}

export default Profile;