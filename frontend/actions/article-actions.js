'use strict';

import superagent from 'superagent';
import {readCookie} from '../lib/util.js';

export const articleCreate = (article, type) => ({
  type: `ARTICLE_CREATE_${type}`,
  payload: article
});

export const articleFetch = (article, type) => ({
  type: `ARTICLE_FETCH_${type}`,
  payload: article
});

export const articleDelete = (article, type) => ({
  type: `ARTICLE_DELETE_${type}`,
  payload: article
});

export const articleCreateRequest = (article) => (dispatch) => {
  let token = readCookie('portfolio-login-token');

  return superagent.post(`${process.env.API_URL}/api/article`)
    .set('Authorization', `Bearer ${token}`)
    .send(article)
    .then((res) => {
      console.log('it works!', res.body);
      dispatch(articleCreate(res.body, 'DEFAULT'));
    })
    .catch((err) => {
      console.error(err);
      dispatch(articleCreate(err, 'ERROR'));
    });
};

export const articleFetchRequest = (article) => (dispatch) => {
  let token = readCookie('portfolio-login-token');

  return superagent.get(`${process.env.API_URL}/api/article/fetch`)
    .set('Authorization', `Bearer ${token}`)
    .query({
      'type': article.type,
      'id': article.id
    })
    .then((res) => {
      console.log('article-fetch working??', res.body);
      dispatch(articleFetch(res.body, article.type.toUpperCase()));
    })
    .catch((err) => {
      console.error(err);
      dispatch(articleFetch(err, 'ERROR'));
    });
};

export const articleDeleteRequest = (article_id) => (dispatch) => {
  let token = readCookie('portfolio-login-token');

  console.log(article_id);

  return superagent.delete(`${process.env.API_URL}/api/article/delete/${article_id}`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => {
      console.log('testing article delete', res.status);
      dispatch(articleDelete(res.status, 'DEFAULT'));
    })
    .catch((err) => {
      console.error(err);
      dispatch(articleDelete(err, 'ERROR'));
    });
};
