'use strict';

const debug = require('debug')('Backend-Portfolio:comment-router.js');

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');

const bearerAuth = require('../lib/bearer-auth-middleware.js');
const Comment = require('../model/Comment.js');
const Message = require('../model/Message.js');

const commentRouter = module.exports = Router();

commentRouter.post('/api/comment', bearerAuth, jsonParser, (req, res, next) => {
  debug('POST: /api/comment');

  if(!req.body || !req.body.text) return next(createError(400, 'no text content provided for comment'));
  if(!req.body.authorId || !req.body.messageId) return next(createError(400, 'missing authorId or messageId request parameters'));

  console.log(req.body.text);
  console.log(req.body.authorId);
  console.log(req.body.messageId);

  Message.findById(req.body.messageId)
    .then((message) => {
      if(!message) return createError(404, 'message not found, unable to post comment');
      new Comment(req.body).save()
        .then((comment) => message.addComment(comment))
        .then((comment) => res.json(comment))
        .catch(next);
    });
});

commentRouter.get('/api/comment/:id', bearerAuth, (req, res, next) => {

});

commentRouter.get('/api/comment/all', bearerAuth, (req, res, next) => {

});

commentRouter.put('/api/updateComment/:id', bearerAuth, (req, res, next) => {
  debug('PUT: /api/updateComment/:id');

  Message.findById
});

commentRouter.delete('/api/removeComment/:id', bearerAuth, (req, res, next) => {

});

commentRouter.delete('/api/removeAllFromUser/:id', bearerAuth, (req, res, next) => {

});

commentRouter.delete('/api/removeAllFromComment/:id', bearerAuth, (req, res, next) => {

});








// messageRouter.put('/api/comment/:id', bearerAuth, jsonParser, (req, res, next) => {
//   debug('POST: /api/comment/:id');
//
//   if(!req.body || !req.body.text) return next(createError(400, 'no text content provided for comment'));
//   if(!req.params.id) return next(createError(400, 'need to provide message id to post comment'));
//
//   Message.findById(req.params.id)
//     .then((message) => message.addComment(req.body.text))
//     .then((comment) => res.json(comment))
//     .catch(next);
// });
