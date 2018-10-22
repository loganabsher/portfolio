'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Link} from 'react-router-dom';

import {signupRequest, loginRequest} from '../../../actions/auth-actions.js';
import * as util from '../../../lib/util.js'
import LoginForm from '../forms/login-form';
import SignupForm from '../forms/signup-form';

class AuthContainer extends React.Component{
  constructor(props){
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleLogin(user){
    return this.props.login(user);
  }

  handleSignup(user){
    return this.props.signup(user);
  }

  render(){
    return(
      <div className='auth-container'>
        <p>forms go here</p>
        <LoginForm onComplete={this.handleLogin} />
        <SignupForm onComplete={this.handleSignup} />
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
