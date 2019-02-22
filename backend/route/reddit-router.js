'use strict';

const debug = require('debug')('Backend-Portfolio:reddit-router.js');

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const superagent = require('superagent');
const createError = require('http-errors');

const bearerAuth = require('../lib/bearer-auth-middleware.js');

const redditRouter = module.exports = Router();

redditRouter.get('/api/reddit/subreddit', bearerAuth, jsonParser, (req, res, next) => {
  debug('GET: /api/reddit/subreddit');

  // NOTE: this probably needs a few more catches
  if(!req.query || !req.query.subreddit || !req.query.limit) return next(createError(400, 'need valid subreddit and limit'));
  superagent.get(`http://reddit.com/r/${req.query.subreddit}.json?limit=${req.query.limit}`)
    .then((response) => res.json(response.body.data.children))
    .catch((err) => console.error(err));
});
