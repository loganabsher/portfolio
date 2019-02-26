'use strict';

import superagent from 'superagent';

import {readCookie} from '../lib/util.js';

export const profileCreate = (profile) => ({
  type: 'PROFILE_CREATE',
  payload: profile
});

export const profileFetch = (profile) => ({
  type: 'PROFILE_FETCH',
  payload: profile
});

export const profileUpdate = (profile) => ({
  type: 'PROFILE_UPDATE',
  payload: profile
});

export const profileDelete = () => ({
  type: 'PROFILE_DELETE',
  payload: null
});

export const profileCreateRequest = (profile) => (dispatch) => {
  let token = readCookie('portfolio-login-token');

  return superagent.post(`${process.env.API_URL}/api/profile`)
    .set('Authorization', `Bearer ${token}`)
    .send(profile)
    .then((res) => {
      dispatch(profileCreate(res.body));
      return res;
    })
    .catch((err) => console.error(err));
};

export const profileFetchRequest = () => (dispatch) => {
  let token = readCookie('portfolio-login-token');

  return superagent.get(`${process.env.API_URL}/api/profile/self`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      dispatch(profileFetch(res.body));
      return res;
    })
    .catch((err) => console.error(err));
};

export const profileUpdateRequest = (profile) => (dispatch) => {
  let token = readCookie('portfolio-login-token');

  return superagent.put(`${process.env.API_URL}/api/profile/edit`)
    .set('Authorization', `Bearer ${token}`)
    .send(profile)
    .then((res) => {
      console.log('profile update', res);
      dispatch(profileUpdate(res.body));
      return res;
    })
    .catch((err) => console.error(err));
};

export const profileDeleteRequest = () => (dispatch) => {
  let token = readCookie('portfolio-login-token');

  return superagent.delete(`${process.env.API_URL}/api/profile/delete`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      console.log('profile delete', res);
      dispatch(profileDelete());
      return res;
    })
    .catch((err) => console.error(err));
}
