'use strict';

const debug = require('debug')('Backend-Portfolio:comment-router.js');

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
// const Promise  = require('bluebird');
const createError = require('http-errors');

const bearerAuth = require('../lib/bearer-auth-middleware.js');
const Comment = require('../model/Comment.js');
const Message = require('../model/Message.js');

const commentRouter = module.exports = Router();

commentRouter.post('/api/comment', bearerAuth, jsonParser, (req, res, next) => {
  debug('POST: /api/comment');

  if(!req.body || !req.body.value) return next(createError(400, 'no text content provided for comment'));
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

// NOTE: this is very broken
// commentRouter.post('/api/comment/reply/:id', bearerAuth, jsonParser, (req, res, next) => {
//   debug('POST: /api/comment/reply/:id');
//
//   if(!req.params.id) return next(createError(400, 'must provide comment id parameter'));
//   if(!req.body || !req.body.value) return next(createError(400, 'no text content provided for comment'));
//   if(!req.body.authorId) return next(createError(400, 'missing authorId request parameter'));
//
//   Comment.findById({_id: req.params.id})
//     .then((comment) => {
//       if(!comment) return createError(404, 'commnet not found, unable to post comment');
//       let reply = new Comment(req.body);
//       comment.addItem(reply);
//       comment.save();
//       reply.save()
//         .then(() => res.json(comment))
//         .catch(next);
//     });
// });

commentRouter.get('/api/comment/:id', bearerAuth, (req, res, next) => {
  debug('GET: /api/comment/:id');

  if(!req.params || !req.params.id) return next(createError(400, 'must provide comment id parameter'));

  Comment.findById(req.params.id)
    .then((comment) => {
      if(!comment) return next(createError(404, 'comment not found'));
      res.json(comment);
    })
    .catch(next);
});

commentRouter.get('/api/comment/self/all', bearerAuth, (req, res, next) => {
  debug('GET: /api/comment/self/all');

  if(!req.user || !req.user._id) return next(createError(401, 'json web token failure, unauthorized'));

  Comment.find({authorId: req.user._id})
    .then((comments) => {
      if(!comments) return next(createError(404, 'no comments found for this user'));
      res.json(comments);
    })
    .catch(next);
});

commentRouter.get('/api/comment/message/all/:id', bearerAuth, (req, res, next) => {
  debug('GET: /api/comment/message/all/:id');

  if(!req.params.id) return next(createError(400, 'must provide message id parameter'));

  Comment.find({messageId: req.params.id})
    .then((comments) => {
      if(!comments) return next(createError(404, 'no comments found for this message'));
      res.json(comments);
    })
    .catch(next);
});

commentRouter.put('/api/updateComment/:id', bearerAuth, jsonParser, (req, res, next) => {
  debug('PUT: /api/updateComment/:id');

  if(!req.body || !req.body.value) return next(createError(400, 'no new text provided'));
  if(!req.params.id) return next(createError(400, 'must provide comment id parameter'));
  if(!req.body || !req.body._id) return next(createError(401, 'json web token failure, unauthorized'));

  Comment.findById({_id: req.params.id})
    .then((comment) => {
      if(!comment) return next(createError(404, 'comment not found'));
      if(comment.authorId !== req.body._id) return next(createError(401, 'you are not authorized to edit this post'));
      comment.text = req.body.text;
      comment.save()
        .then((comment) => {
          Message.findById({_id: comment.messageId})
            .then((message) => {
              if(!message) return next(createError(500, 'no message found for the comment.messageId parameter'));
              message.updateComment(comment)
                .then((message) => res.json(message));
            });
        });
    })
    .catch(next);
});

commentRouter.delete('/api/removeComment/:id', bearerAuth, (req, res, next) => {
  debug('DELETE: /api/removeComment/:id');

  if(!req.params.id) return next(createError(400, 'must provide comment id parameter'));
  if(!req.body || !req.body._id) return next(createError(401, 'you are not authorized to remove this post'));

  Comment.findById({_id: req.params.id})
    .then((comment) => {
      if(!comment) return next(createError(404, 'comment not found'));
      Message.findById({_id: comment.messageId})
        .then((message) => {
          if(!message) return next(createError(500, 'no message found for the comment.messageId parameter'));
          message.deleteComment(comment);
        })
        .then(() => {
          Comment.findByIdAndRemove({_id: req.params.id})
            .then(() => res.status(204).send());
        });
    })
    .catch(next);
});

// NOTE: these last two methods probably need some sort of authentication
commentRouter.delete('/api/removeComment/user/all', bearerAuth, (req, res, next) => {
  debug('DELETE: /api/removeComment/user/all');

  if(!req.body || !req.body._id) return next(createError(401, 'you are not authorized to remove this post'));

  Comment.find({authorId: req.user._id})
    .then((comments) => {
      if(!comments) return next(createError(404, 'no comments found for this user'));
      comments.forEach((ele) => {
        Message.findById(ele.messageId)
          .then((message) => {
            if(!message) return next(createError(500, 'no message found for the comment.messageId parameter'));
            message.deleteComent(ele);
          })
          .then(() => Comment.deleteOne(ele._id));
      })
        .then(() => res.status(204).send());
    })
    .catch(next);
});

commentRouter.delete('/api/removeComment/message/all/:id', bearerAuth, (req, res, next) => {
  debug('DELETE: /api/removeComment/message/all/:id');

  if(!req.params.id) return next(createError(400, 'must provide message id parameter'));

  Comment.find({messageId: req.params.id})
    .then((comments) => {
      if(!comments) return next(createError(404, 'no comments found for this message'));
      comments.forEach((ele) => {
        Message.findById(ele.messageId)
          .then((message) => {
            if(!message) return next(createError(500, 'no message found for the comment.messageId parameter'));
            message.deleteComent(ele).save();
          })
          .then(() => Comment.deleteOne(ele._id));
      })
        .then(() => res.status(204).send());
    })
    .catch(next);
});
