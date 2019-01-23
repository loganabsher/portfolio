'use strict';

import superagent from 'superagent';

import {readCookie} from '../lib/util.js';

export const profileCreate = () => ({
  type: 'PROFILE_CREATE',
});

export const profileFetch = (profile) => ({
  type: 'PROFILE_FETCH',
  payload: profile
});

export const profileCreateRequest = (profile) => (dispatch) => {
  let token = readCookie('portfolio-login-token');

  return superagent.post(`${process.env.API_URL}/api/profile`)
    .set('Authorization', `Bearer ${token}`)
    .send(profile)
    .then((res) => {
      console.log('it works!', res.text);
      dispatch(profileCreate());
      return res;
    })
    .catch((err) => console.error(err));
};

export const profileFetchRequest = () => (dispatch) => {
  let token = readCookie('portfolio-login-token');

  return superagent.get(`${process.env.API_URL}/api/profile/self`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      console.log(res);
      console.log('fetch working', res.text);
      dispatch(profileFetch('hey'));
      return res;
    })
    .catch((err) => console.error(err));
};
