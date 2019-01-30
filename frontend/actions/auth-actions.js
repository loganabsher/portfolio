'use strict';

import superagent from 'superagent';
import {createCookie, deleteCookie} from '../lib/util';

export const tokenSet = (token) => {
  createCookie('portfolio-login-token', token, 8);
  return {
    type: 'TOKEN_SET',
    payload: token
  };
};

// export const userSet = (id) => {
//   createCookie('user', id, 8);
//   return {
//     type: 'USER_SET',
//     payload: id
//   };
// };

export const logout = () => {
  deleteCookie('portfolio-login-token');
  return {type: 'LOGOUT'};
};

export const signupRequest = (user) => (dispatch) => {
  return superagent.post(`${process.env.API_URL}/api/signup`)
    .withCredentials()
    .send(user)
    .then((res) => {
      console.log(res)
      dispatch(tokenSet(res.body));
      return res;
    })
    .catch((err) => console.error(err));
};

export const loginRequest = (user) => (dispatch) => {
  return superagent.get(`${process.env.API_URL}/api/login`)
    .withCredentials()
    .auth(user.email, user.password)
    .then((res) => {
      console.log(res)
      dispatch(tokenSet(res.body));
      return res;
    })
    .catch((err) => console.error(err));
};
