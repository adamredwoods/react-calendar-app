import React, { Component } from 'react';
import '../css/Edit.css';
import '../css/ButtonsAndMore.css';
import { Row, Col, Hidden, ClearFix } from 'react-grid-system';
import "date-format-lite";

//TODO: functional component
class EditCalendar extends Component {
    onClickCancel = (e) => {
      this.props.onClickEventAction(0);
   }
    render(){
        console.log('we tried to render edit cal');

        return(
            <div className="form edit-form nice-form-div">
                <form name="Edit Calendar" className="nice-form" onSubmit={this.props.editCal}>
                    <div className="form-field-container">
                        <h3>Calendar Name</h3>
                        <input className="form-field" onChange={this.props.handleName} type="text" value={this.props.name} />
                    </div>
                    <input type="submit" value="Edit Calendar" />
                </form>
                <div className="btn outline margin-10" onClick={this.onClickCancel}>cancel</div>
            </div>
        );
    }
}


export default EditCalendar;
