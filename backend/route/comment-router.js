'use strict';

const debug = require('debug')('Backend-Portfolio:comment-router.js');

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Promise = require('bluebird');
const createError = require('http-errors');

const bearerAuth = require('../lib/bearer-auth-middleware.js');
const Comment = require('../model/Comment.js');

const commentRouter = module.exports = Router();

commentRouter.post('/api/comment', bearerAuth, jsonParser, (req, res) => {
  debug('POST: /api/comment');

  return new Promise((resolve, reject) => {
    if(!req.body || !req.body.text || !req.body.prev) return reject(createError(400, 'bad request: missing minimum content requirments'));
    if(!req.user || !req.user._id) return reject(createError(401, 'unauthorized: json web token failure, your token either doesn\'t exist or is invalid'));

    let comment = new Comment({
      authorId: req.user._id,
      text: req.body.text || null,
      title: req.body.title || null,
    });

    comment.save()
      .then((comment) => resolve(res.json(comment)))
      .catch((err) => reject(err));
  });
});
