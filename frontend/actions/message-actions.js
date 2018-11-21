'use strict';

import superagent from 'superagent';

export const messageCreate = (message) => ({
  type: 'MESSAGE_CREATE',
  payload: message
});

export const messageCreateRequest = (message) => (dispatch) => {
  let token = document.cookie.split('=')[1];
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
