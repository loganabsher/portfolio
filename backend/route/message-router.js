'use strict';

const debug = require('debug')('Backend-Portfolio:message-router.js');

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');

const bearerAuth = require('../lib/bearer-auth-middleware.js');
const Message = require('../model/Message.js');

const messageRouter = module.exports = Router();

messageRouter.post('/api/message', bearerAuth, jsonParser, (req, res, next) => {
  debug('POST: /api/message');

  if(!req.body || !req.body.title) return next(createError(400, 'bad request: missing minimum content requirments'));
  if(!req.user || !req.user._id) return next(createError(401, 'unauthorized: json web token failure, your token either doesn\'t exist or is invalid'));

  const message = new Message({
    author_id: req.user._id,
    title: req.body.title,
    text: req.body.text || null
  });

  message.save()
    .then((message) => res.json(message))
    .catch((err) => next(err));
});

// NOTE: I'm thinking of combining all get routes into one big route that handles everything
// based on certain query parameters that can be handed in

messageRouter.get('/api/message/fetch', bearerAuth, jsonParser, (req, res, next) => {
  debug('GET: /api/message/fetch');

  if(!req.query) return next(createError(400, 'bad request: no queries were provided for the route', req.query));
  if(!req.user || !req.user._id) return next(createError(401, 'unauthorized: json web token failure, your token saved in cookies does not match your user id'));

  // NOTE: what if I updated this again to work with only one query param and change things
  // based on it's type?

  if(req.query.all){
    Message.find({})
      .then((messages) => {
        if(!messages) return next(createError(404, 'not found: no items were found'));
        return res.json(messages);
      })
      .catch((err) => next(err));
  }else if(req.query.me){
    Message.find({'author_id': req.user._id})
      .then((messages) => {
        if(!messages) return next(createError(404, 'not found: no items were found'));
        return res.json(messages);
      })
      .catch((err) => next(err));
  }else if(req.query.message_id){
    Message.findById({'_id': req.query.message_id})
      .then((message) => {
        if(!message) return next(createError(404, 'not found: no items were found'));
        return res.json(message);
      })
      .catch((err) => next(err));
  }else{
    return next(createError(400, 'bad request: something went wrong with the query parameters', req.query));
  }

  // query parameter:
  // id: if an id is provided we just try to fetch that message and return it
  // self: if this is provided we return all items with this user's id
  // all: if this is provided we return all messages
});

messageRouter.put('/api/message/edit/:message_id', bearerAuth, jsonParser, (req, res, next) => {
  debug('PUT: /api/message/edit/:message_id');

  if(!req.params || !req.params.message_id) return next(createError(400, 'an _id must be provided, got:', req.params.id));
  if(!req.body || (!req.body.photos && (!req.body.title && !req.body.text))) return next(createError(400, 'bad request: missing minimum content requirments'));
  if(!req.user || !req.user._id) return next(createError(401, 'unauthorized: json web token failure, your token saved in cookies does not match your user id'));

  Message.findById({'_id': req.params.message_id})
    .then((message) => {
      if(!message) return next(createError(404, 'not found: no message was found:', message));
      if(req.user._id != message.author_id) return next(createError(401, 'unauthorized: json web token failure, your token saved in cookies does not match your user id'));

      if(req.body.title) message.title = req.body.title;
      if(req.body.text) message.text = req.body.text;
      message.updated_at = Date.now();
      message.save();
      return message;
    })
    .then((message) => res.json(message))
    .catch((err) => next(err));
});

messageRouter.delete('/api/message/remove/:message_id', bearerAuth, (req, res, next) => {
  debug('DELETE: /api/message/remove/:message_id');

  if(!req.params || !req.params.message_id) return next(createError(400, 'an _id must be provided, got:', req.params.id));
  if(!req.user || !req.user._id) return next(createError(401, 'unauthorized: json web token failure, your token saved in cookies does not match your user id'));

  Message.findById({'_id': req.params.message_id})
    .then((message) => {
      if(!message) return next(createError(404, 'not found: no message was found:', message));
      if(req.user._id != message.author_id) return next(createError(401, 'unauthorized: json web token failure, your token saved in cookies does not match your user id'));

      if(message.next.length > 0){
        message.handleDelete()
          .then(() => {
            Message.deleteOne({'_id': req.params.message_id})
              .then(() => res.status(204).send())
              .catch((err) => next(createError(500, 'failed delete', err)));
          })
          .catch((err) => next(createError(500, 'failed delete', err)));
      }else{
        Message.deleteOne({'_id': req.params.message_id})
          .then(() => res.status(204).send())
          .catch((err) => next(createError(500, 'failed delete', err)));
      }
    });
});
