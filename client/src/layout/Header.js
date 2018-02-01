import React, { Component } from 'react';
import Logout from '../auth/Logout.js';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-grid-system';
import Menu from '../Menu.js';

class Header extends Component {
   constructor(props) {
      super(props);
      this.state={
         showMenu: false
      }
   }

   onClickToggleMenu = (e) => {
      e.preventDefault();
      this.setState({showMenu: !this.state.showMenu});
   }

  render(){
    let links = <span />
    if(this.props.user){
      links = <span><a href="#" onClick={this.onClickToggleMenu}>menu</a><Link className="app-logo" to="/">ProlifiCal</Link><Link to="/profile">Profile</Link><Logout /></span>;
    }
    else {
      links = <span><Link className="app-logo" to="/">ProlifiCal</Link><Link to="/login">Login</Link><Link to="/signup">Sign Up</Link></span>;
    }
    return(
        <div><div className="nav">
          {links}
        </div>
        <Menu calendar={this.props.calendar} user={this.props.user} onClickToggleMenu={this.onClickToggleMenu} showMenu={this.state.showMenu} onClickEventAction={this.props.onClickEventAction}/>
        </div>
      );
  }
}

export default Header;
