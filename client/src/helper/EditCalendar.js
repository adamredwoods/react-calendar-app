import React, { Component } from 'react';
import { Row, Col } from 'react-grid-system';

class EditCalendar extends Component {
    render(){
        let currentCalendar = JSON.parse(localStorage.getItem("calendar"));
        return(
            <form name="Edit" onSubmit={this.props.editCal}>
                <label value="Name" />
                <input type="text" value={currentCalendar.name} />
                <label value="Add Contributors" />
                <input type="" />
                <input type="submit" value="Edit Calendar" />
            </form>
        );
    }
}

export default EditCalendar;