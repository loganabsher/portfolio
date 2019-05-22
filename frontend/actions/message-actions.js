'use strict';

import superagent from 'superagent';

import {readCookie} from '../lib/util.js';

export const messageCreate = () => ({
  type: 'MESSAGE_CREATE'
});

// NOTE: this is unfinished, but once I update the router I could modify this
export const messageFetch = (message) => ({
  type: `MESSAGE_FETCH_${message.type}`,
  payload: message
});

// export const messageFetch = (message) => ({
//   type: 'MESSAGE_FETCH',
//   payload: message
// });
//
// export const messageFetchAll = (message) => ({
//   type: 'MESSAGE_FETCH_ALL',
//   payload: message
// });
//
// export const messageFetchAllUser = (message) => ({
//   type: 'MESSAGE_FETCH_ALL_USER',
//   payload: message
// });

export const messageUpdate = (message) => ({
  type: 'MESSAGE_UPDATE',
  payload: message
});

export const messageDelete = () => ({
  type: 'MESSAGE_DELETE'
});

export const messageCreateRequest = (message) => (dispatch) => {
  let token = readCookie('portfolio-login-token');

  // NOTE: note sure if error handling in this would be a good idea, esspecially because the same
  // thing is being done in the router

  message.author_id = readCookie('user');
  return superagent.post(`${process.env.API_URL}/api/message`)
    .set('Authorization', `Bearer ${token}`)
    .send(message)
    .then((res) => {
      console.log('it works!', res.body);
      dispatch(messageCreate());
      return res;
    })
    .catch((err) => console.error(err));
};

export const messageFetchRequest = (message) => (dispatch) => {
  let token = readCookie('portfolio-login-token');

  return superagent.get(`${process.env.API_URL}/api/message/fetch`)
    .set('Authorization', `Bearer ${token}`)
    .query({
      'type': message.type,
      'id': message.id
    })
    .then((res) => {
      console.log('message-fetch working??', res.body);
      res.body.type = message.type.toUpperCase();
      dispatch(messageFetch(res.body));
      return res;
    })
    .catch((err) => console.error(err));
};

// export const messageFetchRequest = (messageId) => (dispatch) => {
//   let token = readCookie('portfolio-login-token');
//
//   return superagent.get(`${process.env.API_URL}/api/message/find/${messageId}`)
//     .set('Authorization', `Bearer ${token}`)
//     .then((res) => {
//       console.log('message-fetch working??', res.body);
//       dispatch(messageFetch(res.body));
//       return res;
//     })
//     .catch((err) => console.error(err));
// };
//
// export const messageFetchAllRequest = () => (dispatch) => {
//   let token = readCookie('portfolio-login-token');
//
//   return superagent.get(`${process.env.API_URL}/api/message/all`)
//     .set('Authorization', `Bearer ${token}`)
//     .then((res) => {
//       dispatch(messageFetchAll(res.body));
//       return res.body;
//     })
//     .catch((err) => console.error(err));
// };
//
// export const messageFetchAllUserRequest = () => (dispatch) => {
//   let token = readCookie('portfolio-login-token');
//
//   return superagent.get(`${process.env.API_URL}/api/message/self`)
//     .set('Authorization', `Bearer ${token}`)
//     .then((res) => {
//       console.log('message-fetch-all-user working??', res.body);
//       dispatch(messageFetchAllUser(res.body));
//       return res.body;
//     })
//     .catch((err) => console.error(err));
// };

export const messageUpdateRequest = (messageId) => (dispatch) => {
  let token = readCookie('portfolio-login-token');

  return superagent.put(`${process.env.API_URL}/api/message/edit/${messageId}`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      console.log('message-update working??', res.body);
      dispatch(messageUpdate(res.body));
      return res.body;
    })
    .catch((err) => console.error(err));
};

export const messageDeleteRequest = (messageId) => (dispatch) => {
  let token = readCookie('portfolio-login-token');

  return superagent.put(`${process.env.API_URL}/api/message/remove/${messageId}`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      console.log('message-delete working??', res.body);
      dispatch(messageDelete());
      return res;
    });
};
