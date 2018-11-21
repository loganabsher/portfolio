'use strict';

import superagent from 'superagent';

export const messagePostRequest =  (message) => (dispatch) => {
  return superagent.post(`${process.env.API_URL}/api/message`)
    .withCredentials()
    
    .send(message)
    .then((res) => {
      dispatch(tokenSet(res.text));
      return res;
    })
    .catch((err) => console.error(err));
};
