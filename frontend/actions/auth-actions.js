'use strict';

import superagent from 'superagent';
import * as util from '../lib/util';

export const tokenSet = (token) => {
  util.createCookie('Special-Cookie', token, 8);
  return {
    type: 'TOKEN_SET',
    payload: token
  };
};

export const logout = () => {
  util.deleteCookie('Special-Cookie');
  return { type: 'LOGOUT' };
};

export const signupRequest =  (user) => (dispatch) => {
  return superagent.post(`${process.env.API_URL}/api/signup`)
    .withCredentials()
    .send(user)
    .then((res) => {
      dispatch(tokenSet(res.text));
      return res;
    })
    .catch((err) => console.error(err));
};

export const loginRequest = (user) => (dispatch) => {
  return superagent.get(`${process.env.API_URL}/api/login`)
    .withCredentials()
    .auth(user.username, user.password)
    .then((res) => {
      dispatch(tokenSet(res.text));
      return res;
    })
    .catch((err) => console.error(err));
};
