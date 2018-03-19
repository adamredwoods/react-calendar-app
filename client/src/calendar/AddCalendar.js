import React, { Component } from 'react';
import {Route} from 'react-router';
import {Link, Redirect} from 'react-router-dom';
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
						  <div className="margin-top-50">
						  <Route render={({history}) => (
                    		<Link to="/" onClick={(e)=>this.props.addCal(e,history)}><input type="submit" value="Add Calendar" /></Link>
							)} />
							</div>
                </form>
					 <Link className="btn outline margin-10" to="/">
						cancel
					 </Link>
            </div>
        );
    }
}

export default AddCalendar;
