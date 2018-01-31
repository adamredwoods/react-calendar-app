import React, { Component } from 'react';
import Logout from '../auth/Logout.js';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-grid-system';
import Menu from '../Menu.js';

class Header extends Component {
  render(){
    let links = <span />
    if(this.props.user){
      links = <span><a href="#">menu</a><Link className="app-logo" to="/">ProlifiCal</Link><Link to="/profile">Profile</Link><Logout /></span>;
    }
    else {
      links = <span><Link className="app-logo" to="/">ProlifiCal</Link><Link to="/login">Login</Link><Link to="/signup">Sign Up</Link></span>;
    }
    return(
        <div><div className="nav">
          {links}
        </div>
        <Menu calendar={this.props.calendar} user={this.props.user}/>
        </div>
      );
  }
}

export default Header;
