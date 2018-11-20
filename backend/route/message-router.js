'use strict';

const debug = require('debug')('Backend-Portfolio:message-router.js');

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Promise = require('bluebird');
const createError = require('http-errors');

const bearerAuth = require('../lib/bearer-auth-middleware.js');
const Message = require('../model/Message.js');

const messageRouter = module.exports = Router();

messageRouter.post('/api/message', bearerAuth, jsonParser, (req, res, next) => {
  debug('POST: /api/message');

  if(!req.body || !req.body.authorId) return next(createError(400, 'missing id credentials'));

  new Message({
    authorId: req.body.authorId,
    text: req.body.text || null,
    title: req.body.title || null,
    photos: req.body.photos || [],
    comments: []
  })
    .save()
    .then((message) => res.json(message))
    .catch(next);
});

messageRouter.get('/api/message/all', bearerAuth, (req, res, next) => {
  debug('GET: /api/message/all');

  Message.find({})
    .then((messages) => res.json(messages))
    .catch(next);
});

messageRouter.get('/api/message/self/:id', bearerAuth, (req, res, next) => {
  debug('GET: /api/message/self/:id');

  if(!req.params || !req.params.id) return next(createError(400, 'missing authorId field'));

  Message.find({authorId: req.params.id})
    .then((messages) => res.json(messages))
    .catch(next);
});

messageRouter.get('/api/message/:id', bearerAuth, (req, res, next) => {
  debug('GET: /api/message/:id');

  if(!req.params.id) return next(createError(400, 'missing user\'s request id'));

  Message.findById(req.params.id)
    .then((message) => res.json(message))
    .catch(next);
});

messageRouter.put('/api/message/edit/:id', bearerAuth, jsonParser, (req, res, next) => {
  debug('PUT: /api/message/edit/:id');

  if(!req.params.id) return next(createError(400, 'missing user\'s request id'));

  Message.findById(req.params.id)
    .then((message) => {
      if(req.body.text){
        message.text = req.body.text;
      }
      if(req.body.title){
        message.title = req.body.title;
      }
      // NOTE: this may need to be fixed later
      if(req.body.photos){
        message.photos = req.body.photos;
      }
      res.json(message);
    })
    .catch(next);
});

messageRouter.delete('/api/message/remove/:id', bearerAuth, (req, res, next) => {
  debug('DELETE: /api/message/remove/:id');

  if(!req.params.id) return next(createError(400, 'missing user\'s request id'));

  Message.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).send())
    .catch(next);
});
