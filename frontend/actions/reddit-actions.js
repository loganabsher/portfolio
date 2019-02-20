'use strict';

import superagent from 'superagent';

import {readCookie} from '../lib/util.js';

export const subredditFetch = (reddit) => ({
  type: 'SUBREDDIT_FETCH',
  payload: reddit
});

export const subredditFetchRequest = (reddit) => (dispatch) => {
  let token = readCookie('portfolio-login-token');

  return superagent.get(`${process.env.API_URL}/api/reddit/subreddit`)
    .set('Authorization', `Bearer ${token}`)
    .query(reddit)
    .then((res) => {
      dispatch(subredditFetch(res.body));
      return res;
    })
    .catch((err) => console.error(err));
};
