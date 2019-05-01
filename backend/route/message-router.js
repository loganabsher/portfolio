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

  let message = new Message({
    authorId: req.user._id,
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
  debug('GET: /api/message/find/:id');

  // query parameter:
  // id: if an id is provided we just try to fetch that message and return it
  // self: if this is provided we return all items with this user's id
  // all: if this is provided we return all messages
});

// messageRouter.get('/api/message/find/:id', bearerAuth, jsonParser, (req, res, next) => {
//   debug('GET: /api/message/find/:id');
//
//   if(!req.params || !req.params.id) return next(createError(400, 'an _id must be provided, got:', req.params.id));
//   if(!req.user || !req.user._id) return next(createError(401, 'unauthorized: json web token failure, your token saved in cookies does not match your user id'));
//
//   Message.findById({'_id': req.params.id})
//     .then((posting) => {
//       if(!posting) return next(createError(404, 'not found: no message was found:', posting));
//       res.json(posting);
//     })
//     .catch((err) => next(err));
// });
//
// messageRouter.get('/api/message/all', bearerAuth, jsonParser, (req, res, next) => {
//   debug('GET: /api/message/all');
//
//   if(!req.user || !req.user._id) return next(createError(401, 'unauthorized: json web token failure, your token either doesn\'t exist or is invalid'));
//
//   Message.find({})
//     .then((postings) => {
//       if(!postings) return next(createError(404, 'not found: no messages were found:', postings));
//       res.json(postings);
//     })
//     .catch((err) => next(err));
// });
//
// messageRouter.get('/api/posting/self', bearerAuth, jsonParser, (req, res, next) => {
//   debug('GET: /api/posting/self');
//
//   if(!req.user || !req.user._id) return next(createError(401, 'unauthorized: json web token failure, your token saved in cookies does not match your user id'));
//
//   Posting.find({'authorId': req.user._id})
//     .then((postings) => {
//       if(!postings) return next(createError(404, 'not found: no messages were found:', postings));
//       res.json(postings);
//     })
//     .catch((err) => next(err));
// });

messageRouter.put('/api/message/edit/:id', bearerAuth, jsonParser, (req, res, next) => {
  debug('PUT: /api/message/edit/:id');

  if(!req.params || !req.params.id) return next(createError(400, 'an _id must be provided, got:', req.params.id));
  if(!req.body || (!req.body.photos && (!req.body.title && !req.body.text))) return next(createError(400, 'bad request: missing minimum content requirments'));
  if(!req.user || !req.user._id) return next(createError(401, 'unauthorized: json web token failure, your token saved in cookies does not match your user id'));

  Message.findById({'_id': req.params.id})
    .then((message) => {
      if(!message) return next(createError(404, 'not found: no message was found:', message));
      if(req.user._id != message.authorId) return next(createError(401, 'unauthorized: json web token failure, your token saved in cookies does not match your user id'));

      if(req.body.title) message.title = req.body.title;
      if(req.body.text) message.text = req.body.text;
      message.updated_at = Date.now();
      message.save();
      return message;
    })
    .then((message) => res.json(message))
    .catch((err) => next(err));
});

messageRouter.delete('/api/message/remove/:id', bearerAuth, jsonParser, (req, res, next) => {
  debug('DELETE: /api/message/remove/:id');

  if(!req.params || !req.params.id) return next(createError(400, 'an _id must be provided, got:', req.params.id));
  if(!req.user || !req.user._id) return next(createError(401, 'unauthorized: json web token failure, your token saved in cookies does not match your user id'));

  Message.findById({'_id': req.params.id})
    .then((message) => {
      if(!message) return next(createError(404, 'not found: no message was found:', message));
      if(req.user._id != message.authorId) return next(createError(401, 'unauthorized: json web token failure, your token saved in cookies does not match your user id'));

      if(message.next.length > 0){
        message.handleDelete()
          .then(() => {
            Message.deleteOne({'_id': req.params.id})
              .then(() => res.status(204).send())
              .catch((err) => next(createError(500, 'failed delete', err)));
          })
          .catch((err) => next(createError(500, 'failed delete', err)));
      }else{
        Message.deleteOne({'_id': req.params.id})
          .then(() => res.status(204).send())
          .catch((err) => next(createError(500, 'failed delete', err)));
      }
    });
});
