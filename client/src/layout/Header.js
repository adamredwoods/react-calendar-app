import React, { Component } from 'react';
import Logout from '../auth/Logout.js';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-grid-system';
import Menu from '../Menu.js';

const Title = (props) => {
   return (
      <div>
         <div className="username-title">{props.userName}</div><div className="calendar-title">{props.calendarTitle}</div>
      </div>
   )
}

class Header extends Component {
   constructor(props) {
      super(props);
      this.state={
         showMenu: false
      }
   }

   onClickToggleMenu = (toggle) => {

		let state = this.state.showMenu;
		if (toggle<0) {
			this.setState({showMenu: false});
		} else {
			this.setState({showMenu: !state});

		}
   }

  render(){
    let links = <span />
    if(this.props.user){
      links = <Row>
         <Col sm={5}><Title userName={this.props.user.name} calendarTitle={this.props.calendar.name} /></Col>
         <Col sm={7}>
         <a href="#" onClick={this.onClickToggleMenu}>Menu</a>
         <Link className="app-logo" to="/">ProlifiCal</Link><Link to="/profile">Profile</Link><Logout />
         </Col>
      </Row>;
    }
    else {
      links = <span><Link className="app-logo" to="/">Calendar</Link><Link to="/login">Login</Link><Link to="/signup">Sign Up</Link></span>;
    }
    return(
        <div>
         <div className="nav">
            {links}
          </div>
        <Menu onClickToggleMenu={this.onClickToggleMenu} showMenu={this.state.showMenu} />
        </div>
      );
  }
}

export default Header;
