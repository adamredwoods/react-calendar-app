import React, { Component } from 'react';
import axios from 'axios';

class Profile extends Component {
  constructor(props){
    super(props);
    this.state={

    }
  }
  componentWillMount = () => {
      let user=this.props.user;
      axios.post('/calendar/all',{
        user: user
      }).then(response => {
        console.log(response);
      }).catch(err => {
        console.log(err);
      })
    }
  render(){
    if(this.props.user && this.props.user.name){
      return (<div>
          <h2>HELLO AGAIN {this.props.user.name}!</h2>
          <h4>Your email is {this.props.user.email}</h4>
        </div>);
    }
    else {
      return (<p>This is a profile page. You need to be logged in to view it.</p>);
    }
  }
}

export default Profile;
