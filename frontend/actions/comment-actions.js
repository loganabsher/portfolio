'use strict';

import superagent from 'superagent';

import {readCookie} from '../lib/util.js';

export const commentCreate = () => ({
  type: 'COMMENT_CREATE'
});

export const commentFetch = (comment) => ({
  type: 'COMMENT_FETCH',
  payload: comment
});

export const commentFetchAllUser = (comment) => ({
  type: 'COMMENT_FETCH_ALL_USER',
  payload: comment
});

export const commentUpdate = (comment) => ({
  type: 'COMMENT_UPDATE',
  payload: comment
});

export const commentDelete = () => ({
  type: 'COMMENT_DELETE'
});

export const commentCreateRequest = (comment) => (dispatch) => {
  let token = readCookie('portfolio-login-token');

  return superagent.post(`${process.env.API_URL}/api/comment`)
    .set('Authorization', `Bearer ${token}`)
    .send(comment)
    .then((res) => {
      console.log('it works!', res.body);
      dispatch(commentCreate());
      return res;
    })
    .catch((err) => console.error(err));
};

export const commentFetchRequest = (commentId) => (dispatch) => {
  let token = readCookie('portfolio-login-token');

  return superagent.get(`${process.env.API_URL}/api/comment/${commentId}`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      console.log('message-fetch working??', res.body);
      dispatch(commentFetch(res.body));
      return res;
    })
    .catch((err) => console.error(err));
};

export const commentFetchAllUserRequest = () => (dispatch) => {
  let token = readCookie('portfolio-login-token');

  return superagent.get(`${process.env.API_URL}/api/comment/self`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      console.log('message-fetch-all-user working??', res.body);
      dispatch(commentFetchAllUser(res.body));
      return res.body;
    })
    .catch((err) => console.error(err));
};

export const commentUpdateRequest = (commentId) => (dispatch) => {
  let token = readCookie('portfolio-login-token');

  return superagent.put(`${process.env.API_URL}/api/comment/edit/${commentId}`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      console.log('message-update working??', res.body);
      dispatch(commentUpdate(res.body));
      return res.body;
    })
    .catch((err) => console.error(err));
};

export const commentDeleteRequest = (commentId) => (dispatch) => {
  let token = readCookie('portfolio-login-token');

  return superagent.put(`${process.env.API_URL}/api/comment/remove/${commentId}`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      console.log('message-delete working??', res.body);
      dispatch(commentDelete());
      return res;
    });
};
