'use strict';

import './_auth-container.scss';

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {signupRequest, loginRequest} from '../../../actions/auth-actions.js';
import AuthForm from '../forms/auth-form';

class AuthContainer extends React.Component{
  constructor(props){
    super(props);

    this.handleAuth = this.handleAuth.bind(this);
  }

  handleAuth(user){
    // NOTE: signup and login are reversed here because of the button text in the auth form
    console.log('hey we got to the handleauth', user)
    if(user.type === 'login'){
      return this.props.login(user)
        .then(() => this.props.history.push('/'));
    }else if(user.type === 'signup'){
      return this.props.signup(user)
        .then(() => this.props.history.push('/settings'));
    }
    // NOTE: maybe throw an error here
  }

  render(){
    // NOTE: move this to auth actions
    let AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
    let clientIDQuqery = `client_id=${process.env.GOOGLE_CLIENT_ID}.apps.googleusercontent.com`;
    let responseTypeQuery = 'response_type=code';
    let scopeQuery = 'scope=openid%20profile%20email';
    let promptQuery = 'prompt=consent';
    let redirectURIQuery = 'redirect_uri=http://localhost:8000/oauth/google/code';

    let formatedURI = `${AUTH_URL}?${clientIDQuqery}&${responseTypeQuery}&${scopeQuery}&${promptQuery}&${redirectURIQuery}`;

    return(
      <div className='auth-container'>
        <h1>Welcome to my portfilio!</h1>
        <AuthForm onComplete={this.handleAuth} />
        <ul className='Oauth-links'>
          <li><a href={formatedURI}>login with google</a></li>
          <li><a href={`${process.env.API_URL}/auth/facebook`}>login with facebook</a></li>
          <li><a href={`${process.env.API_URL}/auth/twitter`}>login with twitter</a></li>
        </ul>
        <h3>If you'd like to skip all of this nonsense click <a>here</a></h3>
      </div>
    );
  }
}

AuthContainer.PropTypes = {
  login: PropTypes.func,
  signup: PropTypes.func
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return{
    signup: (user) => dispatch(signupRequest(user)),
    login: (user) => dispatch(loginRequest(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
