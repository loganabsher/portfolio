'use strict';

const debug = require('debug')('Backend-Portfolio:message-router.js');

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Promise = require('bluebird');
const createError = require('http-errors');

const bearerAuth = require('../lib/bearer-auth-middleware.js');
const Message = require('../model/Message.js');

const messageRouter = module.exports = Router();

messageRouter.post('/api/message', bearerAuth, jsonParser, (req, res) => {
  debug('POST: /api/message');

  return new Promise((resolve, reject) => {
    if(!req.body || (!req.body.photos && (!req.body.title && !req.body.text))) return reject(createError(400, 'bad request: missing minimum content requirments'));
    if(!req.user || !req.user._id) return reject(createError(401, 'unauthorized: json web token failure, your token either doesn\'t exist or is invalid'));

    let message = new Message({
      // NOTE: this is probably a bad idea to have a user's id within each message
      authorId: req.user._id,
      text: req.body.text || null,
      title: req.body.title || null,
    });

    if(req.body.parentId){
      Message.findById({'_id': req.body.parentId})
        .then((parent) => {
          if(!parent || !parent.comments) reject(createError(404, 'not found: this parent node was either invalid or doesn\'t exist:', parent));
          let add = (node, comment) => {
            node.addComment(comment)
              .then((parent) => {
                if(parent.prev){
                  add(parent.prev, node);
                }
              });
          };
          add(parent, message);
          resolve(res.json(message));
        });
    }else{
      message.save()
        .then((message) => resolve(res.json(message)))
        .catch((err) => reject(err));
    }
  });
});

messageRouter.get('/api/message/all', bearerAuth, jsonParser, (req, res) => {
  debug('GET: /api/message/all');

  return new Promise((resolve, reject) => {
    if(!req.user || !req.user._id) return reject(createError(401, 'unauthorized: json web token failure, your token either doesn\'t exist or is invalid'));

    Message.find({'prev': null})
      .then((messages) => {
        if(!messages) return reject(createError(404, 'not found: no messages were found:', messages));
        resolve(res.json(messages));
      })
      .catch((err) => reject(err));
  });
});

messageRouter.get('/api/message/self', bearerAuth, jsonParser, (req, res) => {
  debug('GET: /api/message/self');

  return new Promise((resolve, reject) => {
    if(!req.user || !req.user._id) return reject(createError(401, 'unauthorized: json web token failure, your token saved in cookies does not match your user id'));

    Message.find({'authorId': req.user._id})
      .then((messages) => {
        if(!messages) return reject(createError(404, 'not found: no messages were found:', messages));
        resolve(res.json(messages));
      })
      .catch((err) => reject(err));
  });
});
messageRouter.get('/api/message/:id', bearerAuth, jsonParser, (req, res) => {
  debug('GET: /api/message/:id');

  return new Promise((resolve, reject) => {
    if(!req.user || !req.user._id) return reject(createError(401, 'unauthorized: json web token failure, your token saved in cookies does not match your user id'));

    Message.findById({'_id': req.params.id})
      .then((message) => {
        if(!message) return reject(createError(404, 'not found: no message was found:', message));
        resolve(res.json(message));
      })
      .catch((err) => reject(err));
  });
});

messageRouter.put('/api/message/edit/:id', bearerAuth, jsonParser, (req, res) => {
  debug('PUT: /api/message/edit/:id');

  return new Promise((resolve, reject) => {
    if(!req.body || (!req.body.photos && (!req.body.title && !req.body.text))) return reject(createError(400, 'bad request: missing minimum content requirments'));
    if(!req.user || !req.user._id) return reject(createError(401, 'unauthorized: json web token failure, your token saved in cookies does not match your user id'));
    Message.findById({'_id': req.params.id})
      .then((message) => {
        if(!message) return reject(createError(404, 'not found: no message was found:', message));
        if(req.user._id != message.authorId) return reject(createError(401, 'unauthorized: json web token failure, your token saved in cookies does not match your user id'));

        if(message.prev){
          Message.findById({'_id': message.prev})
            .then((parent) => {
              parent.comments.map((node) => {
                console.log('node._id:', node._id, 'message._id', message._id)
                console.log(typeof node._id, typeof message._id)
                if(node._id == message._id){
                  console.log('matching node found')
                  if(req.body.title) message.title = req.body.title;
                  if(req.body.text) message.text = req.body.text;
                  message.updated_at = Date.now();
                  message.save();
                  parent.save();
                }
              });
            })
            .catch((err) => reject(err));
        }else{
          if(req.body.title) message.title = req.body.title;
          if(req.body.text) message.text = req.body.text;
          message.updated_at = Date.now();
          message.save();
        }
        return message;
      })
      .then((message) => resolve(res.json(message)));
  });
});

messageRouter.delete('/api/message/remove/:id', bearerAuth, jsonParser, (req, res) => {
  debug('DELETE: /api/message/remove/:id');

  return new Promise((resolve, reject) => {
    if(!req.user || !req.user._id) return reject(createError(401, 'unauthorized: json web token failure, your token saved in cookies does not match your user id'));

    Message.findById({'_id': req.params.id})
      .then((message) => {
        if(!message) return reject(createError(404, 'not found: no message was found:', message));
        if(req.user._id != message.authorId) return reject(createError(401, 'unauthorized: json web token failure, your token saved in cookies does not match your user id'));

        if(!message.prev){
          if(message.comments > 0){
            message.deleteSelfAndAllComments()
              .then(() => resolve(res.status(204).send()))
              .catch((err) => reject(err));
          }else{
            message.deleteSelf()
              .then(() => resolve(res.status(204).send()))
              .catch((err) => reject(err));
          }
        }else{
          if(message.comments > 0){
            message.removeComment()
              .then((message) => resolve(res.json(message)))
              .catch((err) => reject(err));
          }else{
            console.log(message);
            console.log(message.deleteSelf)
            message.deleteSelf()
              .then(() => resolve(res.status(204).send()))
              .catch((err) => reject(err));
          }
        }
      });
  });
});
