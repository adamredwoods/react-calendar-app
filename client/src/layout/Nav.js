import React, { Component } from 'react';
import logo from '../logo.svg';
import Logout from '../auth/Logout.js';
import { Link } from 'react-router-dom';

class Nav extends Component {
  render(){
    let links = <span />
    if(this.props.user){
      links = <span><Logout /><Link to="/profile">Profile</Link></span>;
    }
    else {
      links = <span><Link to="/login">Login</Link><Link to="/signup">Sign Up</Link></span>;
    }
    return(
        <div>
          <nav className="nav">
            <a href="/">Home</a>
            {links}
          </nav>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to MERN Stack Boilerplate!</h1>
          </header>
        </div>
      );
  }
}

export default Nav;
