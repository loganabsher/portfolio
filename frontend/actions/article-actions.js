'use strict';

import superagent from 'superagent';
import {readCookie} from '../lib/util.js';

export const articleCreate = () => ({
  type: 'ARTICLE_CREATE'
});

export const articleFetch = (article) => ({
  type: 'ARTICLE_FETCH',
  payload: article
});

export const articleCreateRequest = (article) => (dispatch) => {
  let token = readCookie('portfolio-login-token');

  return superagent.post(`${process.env.API_URL}/api/article`)
    .set('Authorization', `Bearer ${token}`)
    .send(article)
    .then((res) => {
      console.log('it works!', res.body);
      dispatch(articleCreate());
      return res;
    })
    .catch((err) => console.error(err));
};

export const articleFetchRequest = (article) => (dispatch) => {
  let token = readCookie('portfolio-login-token');

  return superagent.get(`${process.env.API_URL}/api/comment/fetch`)
    .set('Authorization', `Bearer ${token}`)
    .queries({
      type: article.type,
      id: article.id
    })
    .then((res) => {
      console.log('article-fetch working??', res.body);
      dispatch(articleFetch(res.body));
      return res;
    })
    .catch((err) => console.error(err));
};
