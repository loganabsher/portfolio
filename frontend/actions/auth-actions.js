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
  if(token){
    return {
      type: 'TOKEN_CHECK',
      payload: token
    };
  }else{
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
        if(token){
          return dispatch(tokenCheck(token.body));
        }else{
          return dispatch(tokenCheck(null));
        }
      })
      .catch(() => {
        // NOTE: need to see if there is a way to edit the delete cookie to completly remove everything including the reference
        deleteCookie('portfolio-login-token');
        return dispatch(tokenCheck(null));
      });
  }else{
    return dispatch(tokenCheck(null));
  }
};
