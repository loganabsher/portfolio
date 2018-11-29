'use strict';

import superagent from 'superagent';

import {readCookie} from '../lib/util.js';

export const messageCreate = () => ({
  type: 'MESSAGE_CREATE'
});

export const messageFetch = (message) => ({
  type: 'MESSAGE_FETCH',
  payload: message
});

export const messageFetchAll = (messages) => ({
  type: 'MESSAGE_FETCH_ALL',
  payload: messages
});

export const messageFetchAllUser = (messages) => ({
  type: 'MESSAGE_FETCH_ALL_USER',
  payload: messages
});

export const messageUpdate = (message) => ({
  type: 'MESSAGE_UPDATE',
  payload: message
});

export const messageDelete = () => ({
  type: 'MESSAGE_DELETE'
});

export const messageCreateRequest = (message) => (dispatch) => {
  let token = readCookie('portfolio-login-token');

  message.authorId = readCookie('user');
  return superagent.post(`${process.env.API_URL}/api/message`)
    .set('Authorization', `Bearer ${token}`)
    .send(message)
    .then((res) => {
      console.log('it works!', res.text);
      dispatch(messageCreate());
      return res;
    })
    .catch((err) => console.error(err));
};

export const messageFetchRequest = (messageId) => (dispatch) => {
  let token = readCookie('portfolio-login-token');

  return superagent.get(`${process.env.API_URL}/api/message/${messageId}`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      console.log('message-fetch working??', res.text);
      dispatch(messageFetch(res.text));
      return res;
    })
    .catch((err) => console.error(err));
};

export const messageFetchAllRequest = () => (dispatch) => {
  let token = readCookie('portfolio-login-token');

  return superagent.get(`${process.env.API_URL}/api/message/all`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      console.log('message-fetch-all working??', res.text);
      dispatch(messageFetchAll(res.text));
      return res;
    })
    .catch((err) => console.error(err));
};

export const messageFetchAllUserRequest = (userId) => (dispatch) => {
  let token = readCookie('portfolio-login-token');

  return superagent.get(`${process.env.API_URL}/api/message/self/${userId}`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      console.log('message-fetch-all-user working??', res.text);
      dispatch(messageFetchAllUser(res.text));
      return res;
    })
    .catch((err) => console.error(err));
};

export const messageUpdateRequest = (messageId) => (dispatch) => {
  let token = readCookie('portfolio-login-token');

  return superagent.put(`${process.env.API_URL}/api/message/edit/${messageId}`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      console.log('message-update working??', res.text);
      dispatch(messageUpdate(res.text));
      return res;
    })
    .catch((err) => console.error(err));
};

export const messageDeleteRequest = (messageId) => (dispatch) => {
  let token = readCookie('portfolio-login-token');

  return superagent.put(`${process.env.API_URL}/api/message/remove/${messageId}`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      console.log('message-delete working??', res.text);
      dispatch(messageDelete());
      return res;
    });
};
