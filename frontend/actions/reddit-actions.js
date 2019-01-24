'use strict';

import superagent from 'superagent';

export const subredditFetch = (subreddit) => ({
  type: 'SUBREDDIT_FETCH',
  payload: subreddit
});

export const subredditFetchRequest = (queries) => (dispatch) => {
  return superagent.get(`${process.env.API_URL}/api/reddit/subreddit`)
    .withCredentials()
    .send(queries)
    .then((res) => {
      console.log(res.body);
      dispatch(subredditFetch(res.body));
      return res.body;
    })
    .catch((err) => console.error(err));
};
