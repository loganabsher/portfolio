'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Link} from 'react-router-dom';

import {signupRequest, loginRequest} from '../../../actions/auth-actions.js';
import LoginForm from '../forms/login-form.js';

class AuthContainer extends React.Component{
  constructor(props){
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleLogin(e){

  }

  handleSignup(e){

  }

  render(){
    return(
      <div className='auth-container'>
        <p>forms go here</p>
        <LoginForm />
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

let mapDispatchToProps = (dispatch) => {
  return {
    signup: (user) => dispatch(signupRequest(user)),
    login: (user) => dispatch(loginRequest(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
