'use strict';

const debug = require('debug')('Backend-Portfolio:reddit-router.js');

const Router = require('express').Router;
const superagent = require('superagent');
const createError = require('http-errors');

const redditRouter = module.exports = Router();

redditRouter.get('/api/reddit/subreddit', (req, res, next) => {
  debug('GET: /api/reddit/subreddit');

  console.log(req.body)

  if(!req.body || !req.body.subreddit || !req.body.limit) return next(createError(400, 'need valid subreddit and limit'));
  superagent.get(`http://reddit.com/r/${req.body.subreddit}.json?limit=${req.body.limit}`)
    .then((res) => {
      console.log(res)
      console.log(res.body);
      console.log(res.text);
      res.json(res.body);
      return res
    })
    .catch((err) => console.error(err));
});
