import React, { Component } from 'react';
import {Route} from 'react-router';
import {Link, Redirect} from 'react-router-dom';
import '../css/Edit.css';
import '../css/ButtonsAndMore.css';
import { Row, Col, Hidden, ClearFix } from 'react-grid-system';
import "date-format-lite";

//TODO: functional component
class EditCalendar extends Component {

    render(){

        return(
            <div className="form edit-form nice-form-div">
                <form name="Edit Calendar" className="nice-form" onSubmit={this.props.editCal}>
                    <div className="form-field-container">
                        <h3>Calendar Name</h3>
                        <input className="form-field" onChange={this.props.handleName} type="text" value={this.props.name} />
                    </div>
                    <input type="submit" value="Edit Calendar" />
                </form>
                <Link className="btn outline margin-top-10" to="/">
				      Cancel
				    </Link>
            </div>
        );
    }
}


export default EditCalendar;
