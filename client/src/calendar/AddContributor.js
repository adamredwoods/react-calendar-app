import React, { Component } from 'react';
import {Route} from 'react-router';
import {Link, Redirect} from 'react-router-dom';
import '../css/Edit.css';
import '../css/ButtonsAndMore.css';
import { Row, Col, Hidden, ClearFix } from 'react-grid-system';
import "date-format-lite";

// TODO: functional component
class AddContributor extends Component {

    render(){
        //let currentCalendar = JSON.parse(localStorage.getItem("calendar"));
        return(
            <div className="form edit-form nice-form-div">
                <form name="Edit Contributors" className="nice-form" >
                    <div className="form-field-container">
                        <h3>Add Contributor by Email</h3>
                        <input className="form-field" type="text" onChange={this.props.handleChange} value={this.props.email} />
                    </div>
                    <div className="form-field-container">
                        <select value={this.props.permission} onChange={this.props.handlePermChange}>
                            <option value="edit">Can Edit</option>
                            <option value="view">View Only</option>
                        </select>
                    </div>
						  <div className="margin-top-50">
						  <Route render={({history}) => (
                    		<Link to="/" onClick={(e)=>this.props.editCal(e,history)}><input type="submit" value="Update" /></Link>
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

export default AddContributor;
