import React, { Component } from 'react';

class Logout extends Component {
  handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('mernToken');
    window.location.href = '/';
  }

  render() {
    return (
      <a href='/' onClick={this.handleLogout}>Logout</a>
    );
  }
}

export default Logout;
