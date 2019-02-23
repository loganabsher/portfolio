'use strict';

import superagent from 'superagent';
import {createCookie, deleteCookie} from '../lib/util.js';

export const tokenSet = (token) => {
  createCookie('portfolio-login-token', token, 8);
  return {
    type: 'TOKEN_SET',
    payload: token
  };
};

export const logout = () => {
  deleteCookie('portfolio-login-token');
  return {type: 'LOGOUT'};
};

export const tokenCheck = (token) => {
  console.log('tokencheck', token);
  if(token){
    console.log('valid')
    return {
      type: 'TOKEN_CHECK',
      payload: token
    };
  }else{
    console.log('invalid')
    return {
      type: 'TOKEN_CHECK',
      payload: null
    };
  }
};

export const signupRequest = (user) => (dispatch) => {
  return superagent.post(`${process.env.API_URL}/api/signup`)
    .withCredentials()
    .send(user)
    .then((res) => dispatch(tokenSet(res.body)))
    .catch((err) => console.error(err));
};

export const loginRequest = (user) => (dispatch) => {
  return superagent.get(`${process.env.API_URL}/api/login`)
    .withCredentials()
    .auth(user.email, user.password)
    .then((res) => dispatch(tokenSet(res.body)))
    .catch((err) => console.error(err));
};

export const tokenCheckRequest = (token) => (dispatch) => {
  if(token){
    return superagent.get(`${process.env.API_URL}/api/checkCookie`)
      .set('Authorization', `Bearer ${token}`)
      .then((token) => {
        console.log('valid token:', token);
        // NOTE: shoulnt need this if / else, but just being safe
        if(token){
          return dispatch(tokenCheck(token));
        }else{
          return dispatch(tokenCheck(null));
        }
      })
      .catch(() => {
        console.log('invalid token', token);
        deleteCookie('portfolio-login-token');
        return dispatch(tokenCheck(null));
      });
  }else{
    console.log('no token', token);
    return dispatch(tokenCheck(null));
  }
};
