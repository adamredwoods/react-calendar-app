import React, { Component } from 'react';

class Flash extends Component {
  cancelMessage = () => {
    this.props.cancelFlash();
  }

  render() {
    let flashType = 'error';
    if(this.props && this.props.flashType){
      flashType = this.props.flashType;
    }
    if(this.props && this.props.flash){
      return (
        <div className={flashType}>
          {this.props.flash} <button className="x-button" onClick={this.cancelMessage}>X</button>
        </div>);
    }
    else {
      return (<div className="no-flash">No Flash</div>);
    }
  }
}

export default Flash;
