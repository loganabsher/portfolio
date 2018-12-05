'use strict';

// TODO: make this. make it good.

import superagent from 'superagent';

export const repoFetch = (repo) => ({
  type: 'REPOS_FETCH',
  payload: repo
});

export const allRepositoriesRequest = () => (dispatch) => {
  return superagent.get(`${process.env.API_URL}/api/repository`)
    .then((res) => {
      dispatch(repoFetch(res.body));
      return res.body;
    })
    .catch((err) => console.error(err));
};
