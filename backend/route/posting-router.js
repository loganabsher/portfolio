'use strict';

const debug = require('debug')('Backend-Portfolio:post-router.js');

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');

const bearerAuth = require('../lib/bearer-auth-middleware.js');
const Posting = require('../model/Posting.js');
// const Comment = require('../model/Comment.js');

const postingRouter = module.exports = Router();

postingRouter.post('/api/posting', bearerAuth, jsonParser, (req, res, next) => {
  debug('POST: /api/posting');

  if(!req.body || !req.body.title) return next(createError(400, 'bad request: missing minimum content requirments'));
  if(!req.user || !req.user._id) return next(createError(401, 'unauthorized: json web token failure, your token either doesn\'t exist or is invalid'));

  let message = new Posting({
    // NOTE: this is probably a bad idea to have a user's id within each message, maybe some sort of encryption is nessessary
    authorId: req.user._id,
    title: req.body.title,
    text: req.body.text || null
  });

  message.save()
    .then((message) => res.json(message))
    .catch((err) => next(err));
});

postingRouter.get('/api/posting/find/:id', bearerAuth, jsonParser, (req, res, next) => {
  debug('GET: /api/posting/find/:id');

  if(!req.params || !req.params.id) return next(createError(400, 'an _id must be provided, got:', req.params.id));
  if(!req.user || !req.user._id) return next(createError(401, 'unauthorized: json web token failure, your token saved in cookies does not match your user id'));

  Posting.findById({'_id': req.params.id})
    .then((posting) => {
      if(!posting) return next(createError(404, 'not found: no message was found:', posting));
      res.json(posting);
    })
    .catch((err) => next(err));
});

postingRouter.get('/api/posting/all', bearerAuth, jsonParser, (req, res, next) => {
  debug('GET: /api/posting/all');

  if(!req.user || !req.user._id) return next(createError(401, 'unauthorized: json web token failure, your token either doesn\'t exist or is invalid'));

  Posting.find({})
    .then((postings) => {
      if(!postings) return next(createError(404, 'not found: no messages were found:', postings));
      res.json(postings);
    })
    .catch((err) => next(err));
});

postingRouter.get('/api/posting/self', bearerAuth, jsonParser, (req, res, next) => {
  debug('GET: /api/posting/self');

  if(!req.user || !req.user._id) return next(createError(401, 'unauthorized: json web token failure, your token saved in cookies does not match your user id'));

  Posting.find({'authorId': req.user._id})
    .then((postings) => {
      if(!postings) return next(createError(404, 'not found: no messages were found:', postings));
      res.json(postings);
    })
    .catch((err) => next(err));
});

postingRouter.put('/api/posting/edit/:id', bearerAuth, jsonParser, (req, res, next) => {
  debug('PUT: /api/posting/edit/:id');

  if(!req.params || !req.params.id) return next(createError(400, 'an _id must be provided, got:', req.params.id));
  if(!req.body || (!req.body.photos && (!req.body.title && !req.body.text))) return next(createError(400, 'bad request: missing minimum content requirments'));
  if(!req.user || !req.user._id) return next(createError(401, 'unauthorized: json web token failure, your token saved in cookies does not match your user id'));

  Posting.findById({'_id': req.params.id})
    .then((posting) => {
      if(!posting) return next(createError(404, 'not found: no message was found:', posting));
      if(req.user._id != posting.authorId) return next(createError(401, 'unauthorized: json web token failure, your token saved in cookies does not match your user id'));

      if(req.body.title) posting.title = req.body.title;
      if(req.body.text) posting.text = req.body.text;
      posting.updated_at = Date.now();
      posting.save();
      return posting;
    })
    .then((posting) => res.json(posting))
    .catch((err) => next(err));
});

postingRouter.delete('/api/posting/remove/:id', bearerAuth, jsonParser, (req, res, next) => {
  debug('DELETE: /api/posting/remove/:id');

  if(!req.params || !req.params.id) return next(createError(400, 'an _id must be provided, got:', req.params.id));
  if(!req.user || !req.user._id) return next(createError(401, 'unauthorized: json web token failure, your token saved in cookies does not match your user id'));

  Posting.findById({'_id': req.params.id})
    .then((posting) => {
      if(!posting) return next(createError(404, 'not found: no message was found:', posting));
      if(req.user._id != posting.authorId) return next(createError(401, 'unauthorized: json web token failure, your token saved in cookies does not match your user id'));

      if(posting.next.length > 0){
        posting.deleteAllChildren()
          .then(() => {
            Posting.deleteOne({'_id': req.params.id})
              .then(() => res.status(204).send())
              .catch((err) => next(createError(500, 'failed delete', err)));
          })
          .catch((err) => next(createError(500, 'failed delete', err)));
      }else{
        Posting.deleteOne({'_id': req.params.id})
          .then(() => res.status(204).send())
          .catch((err) => next(createError(500, 'failed delete', err)));
      }
    });
});
