import React, { Component } from 'react';
import '../css/Edit.css';
import '../css/ButtonsAndMore.css';
import { Row, Col, Hidden, ClearFix } from 'react-grid-system';
import "date-format-lite";

// TODO: functional component
class AddCalendar extends Component {

    render(){
        return(
            <div className="nice-form-div">
                <form name="Create A Calendar" className="nice-form" onSubmit={this.props.addCal}>
                    <div className="form-field-container">
                        <h3>Calendar Name</h3>
                        <input className="form-field" onChange={this.props.handleName} type="text" />
                    </div>
                    <input type="submit" value="Add Calendar" />
                </form>
					 <Link className="btn outline margin-10" to="/">
						cancel
					 </Link>
            </div>
        );
    }
}

export default AddCalendar;
