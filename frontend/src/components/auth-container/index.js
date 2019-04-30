'use strict';

import './_auth-container.scss';

import React from 'react';
import {connect} from 'react-redux';
import propTypes from 'prop-types';

import {signupRequest, loginRequest} from '../../../actions/auth-actions.js';
import AuthForm from '../forms/auth-form';

class AuthContainer extends React.Component{
  constructor(props){
    super(props);

    this.handleAuth = this.handleAuth.bind(this);
  }

  handleAuth(user){
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
    const GOOGLE_OAUTH_URI = `${process.env.GOOGLE_AUTH_URL}?${process.env.GOOGLE_CLIENT_ID}&${process.env.GOOGLE_RESPONSE_TYPE}&${process.env.GOOGLE_SCOPES}&${process.env.GOOGLE_PROMPT_TYPE}&${process.env.GOOGLE_REDIRECT_URI}`;
    const FACEBOOK_OAUTH_URI = `${process.env.FACEBOOK_AUTH_URL}?${process.env.FACEBOOK_CLIENT_ID}&${process.env.FACEBOOK_RESPONSE_TYPE}&${process.env.FACEBOOK_SCOPES}&${process.env.FACEBOOK_REDIRECT_URI}&${process.env.FACEBOOK_APP_STATE}`;
    // const TWITTER_OAUTH_URI = `${process.env.TWITTER_AUTH_URL}?${process.env.TWITTER_CONSUMER_KEY}&${process.env.TWITTER_CALLBACK_URI}`;
    const TWITTER_OAUTH_URI = `${process.env.TWITTER_AUTH_URL}?${process.env.TWITTER_AUTH_TOKEN}`;

    console.log(GOOGLE_OAUTH_URI);
    console.log(FACEBOOK_OAUTH_URI);
    console.log(TWITTER_OAUTH_URI);
    // NOTE: so I guess twitter API isn't designed to accept an inital URI link so everything needs to be done in the backend route
    return(
      <div className='auth-container'>
        <h1>Welcome to my portfilio!</h1>
        <AuthForm onComplete={this.handleAuth} />
        <ul className='Oauth-links'>
          <li><a href={GOOGLE_OAUTH_URI}>login with google</a></li>
          <li><a href={FACEBOOK_OAUTH_URI}>login with facebook</a></li>
          <li><a href={`${process.env.API_URL}/oauth/twitter/code`}>login with twitter</a></li>
        </ul>
        <h3>If you'd like to skip all of this nonsense click <a>here</a></h3>
      </div>
    );
  }
}

AuthContainer.propTypes = {
  history: propTypes.object,
  login: propTypes.func,
  signup: propTypes.func
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
