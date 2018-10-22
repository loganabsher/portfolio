'use strict';

// TODO: make this. make it good.

import superagent from 'superagent';

export const repoSet = (repo) => ({
  type: 'REPOS_SET',
  payload: repo
})

export const allRepositoriesRequest = () => (dispatch) => {
  return superagent.get(`${API_URL}/api/repositories/all`)
    .then((res) => {
      console.log('finding repos', res);
      dispatch(repoSet(res.body));
      return res.body;
    })
    .catch((err) => {
      console.error(err);
    })
}