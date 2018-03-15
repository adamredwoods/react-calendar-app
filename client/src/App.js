import React, { Component } from 'react';
import { BrowserRouter, Route , Switch} from 'react-router-dom';
import './css/App.css';
import axios from 'axios';
import Flash from './layout/Flash.js';
import Main from './Main.js';
import ReactDOM from 'react-dom';
import Header from './layout/Header.js';
import Login from './auth/Login.js';
import Profile from './Profile.js';
import Signup from './auth/Signup.js';




class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {},
      calendar: {},
      eventAction: "",
      eventObject: null
    }
  }
  componentDidMount = () => {
    this.getUser();
  }

  getUser = () => {
        // If there is a token in localStorage
    var token = localStorage.getItem('mernToken');
    var calendar = localStorage.getItem('calendar');
    if (token === 'undefined' || token === null || token === '' || token === undefined) {
      localStorage.removeItem('mernToken');
      localStorage.removeItem('calendar');
      localStorage.removeItem('user');
      this.setState({
        token: '',
        user: null,
        calendar: null
      });
    } else {
      //   Validate the token against the server
      axios.post('/auth/me/from/token', {
        token: token,
        calendar: calendar
      }).then(response => {
        //   Store the token and user
        localStorage.setItem('mernToken', response.data.token);
        localStorage.setItem('calendar', JSON.stringify(response.data.calendar));
        localStorage.setItem('user', JSON.stringify(response.data.user._id));
        this.setState({
          token: response.data.token,
          user: response.data.user,
          calendar: response.data.calendar
        });
        //   Pass User into child components and display main app
      }).catch(err => {
        // Both the JWT and db errors will be caught here
        console.log('cdm', err);
        this.setState({
          token: '',
          user: null,
          calendar: null
        });
      })
    }
  }

  updateUser = () => {
    this.getUser();
  }

  setFlash = (t, msg) => {
    this.setState({
      flash: msg,
      flashType: t
    });
  }

  onClickShowCal = (calObj) => {
    console.log(calObj);
  }

  cancelFlash = () => {
    this.setState({
      flash: '',
      flashType: ''
    });
  }

  onClickEventAction = (actionType, obj) => {
     console.log("event action x", actionType);
     this.setState({eventAction: actionType, eventObject: obj});
 }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Header user={this.state.user} calendar={this.state.calendar} onClickEventAction={this.onClickEventAction}/>
            <div className="space">
              <Flash flashType={this.state.flashType} flash={this.state.flash} setFlash={this.setFlash} cancelFlash={this.cancelFlash} />
				  <Switch>
	              <Route path="/login" render={
	                () => (<Login calendar={this.state.calendar} user={this.state.user} setFlash={this.setFlash} updateUser={this.updateUser} />)} />
	              <Route path="/signup" render={
	                () => (<Signup calendar={this.state.calendar} user={this.state.user} setFlash={this.setFlash} updateUser={this.updateUser} />)} />
	              <Route path="/profile" render={
	                () => (<Profile onClickShowCal={this.onClickShowCal} user={this.state.user} setFlash={this.setFlash} eventAction={this.state.eventAction} onClickEventAction={this.onClickEventAction}/>)} />
					  <Route path="/" render={
						 () => <Main calendar={this.state.calendar} user={this.state.user} eventAction={this.state.eventAction} eventObject={this.state.eventObject} onClickEventAction={this.onClickEventAction} />} />
				  </Switch>
				</div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
