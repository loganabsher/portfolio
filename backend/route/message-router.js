'use strict';

const debug = require('debug')('Backend-Portfolio:message-router.js');

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Promise = require('bluebird');
const createError = require('http-errors');

const bearerAuth = require('../lib/bearer-auth-middleware.js');
const Message = require('../model/Message.js');

const messageRouter = module.exports = Router();

messageRouter.post('/api/message/post', bearerAuth, jsonParser, (req, res) => {
  debug('POST: /api/message/post');

  return new Promise((resolve, reject) => {
    if(!req.body || (!req.body.photos && (!req.body.title && !req.body.text))) reject(createError(400, 'bad request: missing minimum content requirments'));
    if(!req.user || !req.user._id) reject(createError(401, 'unauthorized: json web token failure, your token saved in cookies does not match your user id'));

    new Message({
      // NOTE: this is probably a bad idea to have a user's id within each message
      authorId: req.user._id,
      // text: req.body.text || null,
      // title: req.body.title || null,
      // NOTE: probably need some sort of method to handle photo uploads
      photos: req.body.photos || [],
      comments: []
    })
      .then((message) => {
        // NOTE: not sure if this is really nessessary, I may come back and fiddle
        // with it to see if there is a better way.
        if(req.body.text) message.text = req.body.text;
        if(req.body.title) message.title = req.body.title;
        return message;
      })
      .save()
      .then((message) => res.json(message))
      .catch((err) => reject(err));
  });
});

messageRouter.post('/api/message/reply', bearerAuth, jsonParser, (req, res) => {
  debug('POST /api/message/reply');

  return new Promise((reslove, reject) => {
    if(!req.body || (!req.body.photos && (!req.body.title && !req.body.text))) reject(createError(400, 'bad request: missing minimum content requirments'));
    if(!req.parentId) reject(createError(400, 'bad request: no parent id was provided in your request:', req.parentId))
    if(!req.user || !req.user._id) reject(createError(401, 'unauthorized: json web token failure, your token saved in cookies does not match your user id'));

    
  });
});
messageRouter.get('/api/message/all')
messageRouter.get('/api/message/self')
messageRouter.get('/api/message/:id')
messageRouter.put('/api/message/edit/:id')
messageRouter.delete('/api/message/remove/:id')
//
// messageRouter.post('/api/message', bearerAuth, jsonParser, (req, res, next) => {
//   debug('POST: /api/message');
//
//   if(!req.body || (!req.body.photos && (!req.body.title && !req.body.text))) return next(createError(400, 'missing minimum content requirments'));
//   if(!req.user || !req.user._id) return next(createError(401, 'json web token failure, unauthorized'));
//
//   new Message({
//     // NOTE: this is probably a bad idea to have a user's id within each message
//     authorId: req.user._id,
//     text: req.body.text || null,
//     title: req.body.title || null,
//     photos: req.body.photos || [],
//     comments: []
//   })
//     .save()
//     .then((message) => res.json(message))
//     .catch(next);
// });
//
// messageRouter.get('/api/message/all', bearerAuth, (req, res, next) => {
//   debug('GET: /api/message/all');
//
//   Message.find({})
//     .then((messages) => res.json(messages))
//     .catch(next);
// });
//
// messageRouter.get('/api/message/self', bearerAuth, (req, res, next) => {
//   debug('GET: /api/message/self');
//
//   if(!req.user || !req.user._id) return next(createError(401, 'json web token failure, unauthorized'));
//
//   Message.find({authorId: req.user._id})
//     .then((messages) => {
//       if(!messages) res.status(204).send();
//       res.json(messages);
//     })
//     .catch(next);
// });
//
// // NOTE: I think this one should stay as it is
// messageRouter.get('/api/message/:id', bearerAuth, (req, res, next) => {
//   debug('GET: /api/message/:id');
//
//   if(!req.params.id) return next(createError(400, 'missing user\'s request id'));
//
//   Message.findById({_id: req.params.id})
//     .then((message) => res.json(message))
//     .catch(next);
// });
//
// messageRouter.put('/api/message/edit/:id', bearerAuth, jsonParser, (req, res, next) => {
//   debug('PUT: /api/message/edit/:id');
//
//   if(!req.params || !req.params.id) return next(createError(400, 'missing user\'s request id'));
//   if(!req.user || !req.user._id) return next(createError(401, 'json web token failure, unauthorized'));
//
//   Message.findById({_id: req.params.id})
//     .then((message) => {
//       if(message.authorId != req.user._id) return next(createError(401, 'you are not authorized to edit this post'));
//       if(req.body.text){
//         message.text = req.body.text;
//       }
//       if(req.body.title){
//         message.title = req.body.title;
//       }
//       // NOTE: this is broken
//       if(req.body.photos){
//         message.photos = req.body.photos;
//       }
//       res.json(message);
//     })
//     .catch(next);
// });
//
// // NOTE: I think I need to remove all comments associated with each message upon deletion
// messageRouter.delete('/api/message/remove/:id', bearerAuth, (req, res, next) => {
//   debug('DELETE: /api/message/remove/:id');
//
//   if(!req.params.id) return next(createError(400, 'missing user\'s request id'));
//   if(!req.user || !req.user._id) return next(createError(401, 'you are not authorized to remove this post'));
//   Message.findById({_id: req.params.id})
//     .then((message) => {
//       if(!message) return next(createError(404, 'no message was found with this id'));
//       if(message.authorId != req.user._id) return next(createError(401, 'you are not authorized to remove this post'));
//       if(message.comments.length > 0){
//         Comment.deleteMany({'messageId': message._id})
//
//       }
//       Message.findByIdAndRemove(req.params.id)
//         .then(() => res.status(204).send())
//         .catch(next);
//     })
//     .catch(next);
// });
