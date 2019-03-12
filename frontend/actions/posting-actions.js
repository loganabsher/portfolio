'use strict';

import superagent from 'superagent';

import {readCookie} from '../lib/util.js';

export const postingCreate = () => ({
  type: 'POSTING_CREATE'
});

export const postingFetch = (posting) => ({
  type: 'POSTING_FETCH',
  payload: posting
});

export const postingFetchAll = (posting) => ({
  type: 'POSTING_FETCH_ALL',
  payload: posting
});

export const postingFetchAllUser = (posting) => ({
  type: 'POSTING_FETCH_ALL_USER',
  payload: posting
});

export const postingUpdate = (posting) => ({
  type: 'POSTING_UPDATE',
  payload: posting
});

export const postingDelete = () => ({
  type: 'POSTING_DELETE'
});

export const postingCreateRequest = (posting) => (dispatch) => {
  let token = readCookie('portfolio-login-token');

  // posting.authorId = readCookie('user');
  return superagent.post(`${process.env.API_URL}/api/posting`)
    .set('Authorization', `Bearer ${token}`)
    .send(posting)
    .then((res) => {
      console.log('it works!', res.body);
      dispatch(postingCreate());
      return res;
    })
    .catch((err) => console.error(err));
};

export const postingFetchRequest = (postingId) => (dispatch) => {
  let token = readCookie('portfolio-login-token');

  return superagent.get(`${process.env.API_URL}/api/posting/find/${postingId}`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      console.log('message-fetch working??', res.body);
      dispatch(postingFetch(res.body));
      return res;
    })
    .catch((err) => console.error(err));
};

export const postingFetchAllRequest = () => (dispatch) => {
  let token = readCookie('portfolio-login-token');

  return superagent.get(`${process.env.API_URL}/api/posting/all`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      dispatch(postingFetchAll(res.body));
      return res.body;
    })
    .catch((err) => console.error(err));
};

export const postingFetchAllUserRequest = () => (dispatch) => {
  let token = readCookie('portfolio-login-token');

  return superagent.get(`${process.env.API_URL}/api/posting/self`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      console.log('message-fetch-all-user working??', res.body);
      dispatch(postingFetchAllUser(res.body));
      return res.body;
    })
    .catch((err) => console.error(err));
};

export const postingUpdateRequest = (postingId) => (dispatch) => {
  let token = readCookie('portfolio-login-token');

  return superagent.put(`${process.env.API_URL}/api/posting/edit/${postingId}`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      console.log('message-update working??', res.body);
      dispatch(postingUpdate(res.body));
      return res.body;
    })
    .catch((err) => console.error(err));
};

export const postingDeleteRequest = (postingId) => (dispatch) => {
  let token = readCookie('portfolio-login-token');

  return superagent.put(`${process.env.API_URL}/api/posting/remove/${postingId}`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      console.log('message-delete working??', res.body);
      dispatch(postingDelete());
      return res;
    });
};
