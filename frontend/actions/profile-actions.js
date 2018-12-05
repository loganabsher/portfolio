'use strict';

import superagent from 'superagent';

import {readCookie} from '../lib/util.js';

export const profileCreate = () => ({
  type: 'PROFILE_CREATE',
});

export const profileCreateRequest = (profile) => (dispatch) => {
  let token = readCookie('portfolio-login-token');

  profile.userId = readCookie('user');
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
