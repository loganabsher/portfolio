'use strict';

import superagent from 'superagent';

import {readCookie} from '../lib/util.js';

export const messageCreate = (message) => ({
  type: 'MESSAGE_CREATE',
  payload: message
});

export const messageCreateRequest = (message) => (dispatch) => {
  let token = readCookie('portfolio-login-token')
  token.replace('"', '');
  console.log(token)
  return superagent.post(`${process.env.API_URL}/api/message`)
    .set('Authorization', `Bearer ${token}`)
    .send(message)
    .then((res) => {
      console.log('it works!', res.text);
      dispatch(messageCreate(res.text));
      return res;
    })
    .catch((err) => console.error(err));
};
