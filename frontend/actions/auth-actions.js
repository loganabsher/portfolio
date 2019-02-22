'use strict';

import superagent from 'superagent';
import {readCookie, createCookie, deleteCookie} from '../lib/util';

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
  return {
    type: 'TOKEN_CHECK',
    payload: token
  };
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

export const tokenCheckRequest = () => (dispatch) => {
  let token = readCookie('portfolio-login-token');

  if(token){
    return superagent.get(`${process.env.API_URL}/api/checkCookie`)
      .set('Authorization', `Bearer ${token}`)
      .then((res) => dispatch(res))
      .catch(() => dispatch(null));
  }else{
    return dispatch(null);
  }
};
