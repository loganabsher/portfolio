'use strict';

import React from 'react';
import {connect} from 'react-redux';
// import {BrowserRouter, Route, Link} from 'react-router-dom';

import {signupRequest, loginRequest} from '../../../actions/auth-actions.js';
// import * as util from '../../../lib/util.js'
import AuthForm from '../forms/auth-form';

class AuthContainer extends React.Component{
  constructor(props){
    super(props);

    this.handleAuth = this.handleAuth.bind(this);
  }

  handleAuth(user){
    // NOTE: signup and login are reversed here because of the button text in the auth form
    if(user.type === 'signup'){
      return this.props.login(user);
    }else if(user.type === 'login'){
      return this.props.signup(user);
    }
    // NOTE: maybe throw an error here
  }

  render(){
    return(
      <div className='auth-container'>
        <p>forms go here</p>
        <AuthForm onComplete={this.handleAuth} />
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  auth: state.auth,
});

let mapDispatchToProps = (dispatch) => {
  return{
    signup: (user) => dispatch(signupRequest(user)),
    login: (user) => dispatch(loginRequest(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
