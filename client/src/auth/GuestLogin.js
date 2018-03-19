import React, { Component } from 'react';
import {Route} from 'react-router';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';


var tryguest=0;

const GuestLogin = (props) => {

	if (!props.user) {
		tryguest=1;
		console.log("guest login");

		 axios.post('/auth/login/guest').then((result) => {
		   localStorage.setItem('mernToken', result.data.token);
		   localStorage.setItem('calendar', result.data.calendar);
		   localStorage.setItem('user', result.data.user);
		   props.updateUser();
			tryguest=0;
		 }).catch((error) => {
		   props.setFlash('error', error.response.status + ': ' + (error.response.data && error.response.data.error ? error.response.data.message : error.response.statusText));
			tryguest=0;
		 });

	 }
	 if (tryguest===0) return (<Redirect to="/" />);
	 return <div></div>;

}

export default GuestLogin;
