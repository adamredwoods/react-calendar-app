import React, { Component } from 'react';
import {Route} from 'react-router';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }

  handleNameChange = (e) => {
    this.setState({name: e.target.value})
  }
  handleEmailChange = (e) => {
    this.setState({email: e.target.value})
  }
  handlePasswordChange = (e) => {
    this.setState({password: e.target.value})
  }

  handleSubmit = (e, history) => {
    e.preventDefault();
    axios.post('/auth/signup', {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }).then(result => {
      localStorage.setItem('mernToken', result.data.token);
      localStorage.setItem('calendar', result.data.calendar);
      localStorage.setItem('user', result.data.user);
      this.props.updateUser();
		history.push("/");
    }).catch(error => {
      console.log(error.response);
      this.props.setFlash('error', error.response.status + ': ' + (error.response.data && error.response.data.error ? error.response.data.message : error.response.statusText));
    })
  }

  render() {
    let form = '';
    if(this.props.user){
      return (<Redirect to="/" />);
    }
    else {
      form = (<div>
					 <form className="nice-form">
                <div>
                  <input name="Name"
                       placeholder="What is your first name?"
                       value={this.state.name}
                       onChange={this.handleNameChange}
                  />
                </div>
                <div>
                  <input name="Email"
                       placeholder="What is your email?"
                       value={this.state.email}
                       onChange={this.handleEmailChange} />
	               </div>
	               <div>
	                  <input name="Password"
	                     placeholder="Choose a password"
	                     type="password"
	                     value={this.state.password}
	                     onChange={this.handlePasswordChange} />
	                 </div>
						  <h6>Warning: This site is currently unsecure. Please do not use real data</h6>

	              </form>
					  <Route render={({history}) => (

						  <button className="btn cyan margin-top-50" onClick={(e)=>this.handleSumbit(e,history)}>Sign up</button>
					  )} />
				  </div>
				);
    }
    return (
      <div>
        {form}
        {this.props.user ? <Redirect to="/profile" /> : ''}
      </div>
    );
  }
}

export default Signup;
