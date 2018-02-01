import React, { Component } from 'react';
import { Row, Col } from 'react-grid-system';

class EditCalendar extends Component {
    render(){
        let currentCalendar = JSON.parse(localStorage.getItem("calendar"));
        return(
            <div className="form edit-form">
                <form name="Edit" onSubmit={this.props.editCal}>
                    <div className="form-field-container">
                        <label value="Name" />
                        <input className="form-field" onChange={this.props.handleName} type="text" value={this.props.name} />
                    </div>
                    <div className="form-field-container">
                        <label value="Add Contributor by Email" />
                        <input className="form-field" type="text" onChange={this.props.handleChange} value={this.props.email} />
                    </div>
                    <div className="form-field-container">
                        <select value={this.props.permission} onChange={this.props.handlePermChange}>
                            <option value="edit">Can Edit</option>
                            <option value="view">View Only</option>
                        </select>
                    </div>
                    <input type="submit" value="Edit Calendar" />
                </form>
            </div>
        );
    }
}

export default EditCalendar;