'use strict';

const debug = require('debug')('Backend-Portfolio:comment-router.js');

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');

const bearerAuth = require('../lib/bearer-auth-middleware.js');
const Posting = require('../model/Posting.js');
const Comment = require('../model/Comment.js');

const commentRouter = module.exports = Router();

commentRouter.post('/api/comment', bearerAuth, jsonParser, (req, res, next) => {
  debug('POST: /api/comment');

  if(!req.body || !req.body.text || !req.body.prev) return next(createError(400, 'bad request: missing minimum content requirments'));
  if(!req.user || !req.user._id) return next(createError(401, 'unauthorized: json web token failure, your token either doesn\'t exist or is invalid'));

  Posting.findById({'_id': req.body.prev})
    .then((posting) => {
      if(!posting) return next(createError(404, 'the post you are trying to comment on doesn\'t exist', posting, req.body.prev));
      let comment = new Comment({
        authorId: req.user._id,
        text: req.body.text,
        prev: req.body.prev,
      });
      return comment.addNext(posting);
    })
    .then((comment) => comment.save())
    .then((comment) => res.json(comment))
    .catch(() => {
      Comment.findById({'_id': req.body.prev})
        .then((posting) => {
          if(!posting) return next(createError(404, 'the post you are trying to comment on doesn\'t exist', posting, req.body.prev));
          let comment = new Comment({
            authorId: req.user._id,
            text: req.body.text,
            prev: req.body.prev,
          });
          return comment.addNext(posting);
        })
        .then((comment) => comment.save())
        .then((comment) => res.json(comment))
        .catch((err) => next(err));
    });
});

commentRouter.get('/api/comment/find/:id', bearerAuth, jsonParser, (req, res, next) => {
  debug('GET: /api/comment/find/:id');

  if(!req.params || !req.params.id) return next(createError(400, 'bad request: no comment id was provided', req.params.id));
  if(!req.user || !req.user._id) return next(createError(401, 'unauthorized: json web token failure, your token either doesn\'t exist or is invalid'));

  Comment.findById({'_id': req.params.id})
    .then((comment) => {
      if(!comment) return next(createError(404, 'comment could not be found with id', req.params.id, comment));
      res.json(comment);
    })
    .catch((err) => next(err));
});

commentRouter.get('/api/comment/self', bearerAuth, jsonParser, (req, res, next) => {
  debug('GET: /api/comment/self');

  if(!req.user || !req.user._id) return next(createError(401, 'unauthorized: json web token failure, your token either doesn\'t exist or is invalid'));

  Comment.find({'authorId': req.user._id})
    .then((comments) => {
      if(!comments) return next(createError(404, 'not found: this user has no comment items'));
      res.json(comments);
    })
    .catch((err) => next(err));
});

commentRouter.put('/api/comment/edit/:id', bearerAuth, jsonParser, (req, res, next) => {
  debug('PUT: /api/posting/edit/:id');

  if(!req.params || !req.params.id) return next(createError(400, 'bad request: no id parameter was provided', req.params.id));
  if(!req.body || !req.body.text) return next(createError(400, 'bad request: insuficient information provided to make change request'));
  if(!req.user || !req.user._id) return next(createError(401, 'unauthorized: json web token failure, your token either doesn\'t exist or is invalid'));

  // NOTE: I'm curious if just using findOneAndUpdate would make things less messy without sacraficing accuracy and the potential for error
  Comment.findById({'_id': req.params.id})
    .then((comment) => {
      if(!comment) return next(createError(404, 'not found: this item doesn\'t exist anymore'));
      if(comment.authorId != req.user._id) return next(createError(401, 'unauthorized: you are not authorized to remove this comment'));
      comment.text = req.body.text;
      return comment;
    })
    .then((comment) => comment.save())
    .then((comment) => res.json(comment))
    .catch((err) => next(err));
});

commentRouter.delete('/api/comment/remove/:id', bearerAuth, jsonParser, (req, res, next) => {
  debug('DELETE: /api/comment/remove/:id');

  if(!req.params || !req.params.id) return next(createError(400, 'bad request: no id parameter was provided', req.params.id));
  if(!req.user || !req.user._id) return next(createError(401, 'unauthorized: json web token failure, your token either doesn\'t exist or is invalid'));

  Comment.findById({'_id': req.params.id})
    .then((comment) => {
      if(!comment) return next(createError(404, 'not found: this item doesn\'t exist anymore'));
      if(comment.authorId != req.user._id) return next(createError(401, 'unauthorized: you are not authorized to remove this comment'));
      comment.delete = true;
    })
    .then((comment) => comment.save())
    .then((comment) => res.json(comment))
    .catch((err) => next(err));
});
