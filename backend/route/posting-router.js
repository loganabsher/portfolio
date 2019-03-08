'use strict';

const debug = require('debug')('Backend-Portfolio:post-router.js');

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Promise = require('bluebird');
const createError = require('http-errors');

const bearerAuth = require('../lib/bearer-auth-middleware.js');
const Posting = require('../model/Posting.js');
// const Comment = require('../model/Comment.js');

const postingRouter = module.exports = Router();

postingRouter.post('/api/posting', bearerAuth, jsonParser, (req, res) => {
  debug('POST: /api/posting');

  return new Promise((resolve, reject) => {
    if(!req.body || !req.body.title) return reject(createError(400, 'bad request: missing minimum content requirments'));
    if(!req.user || !req.user._id) return reject(createError(401, 'unauthorized: json web token failure, your token either doesn\'t exist or is invalid'));

    let message = new Posting({
      // NOTE: this is probably a bad idea to have a user's id within each message, maybe some sort of encryption is nessessary
      authorId: req.user._id,
      title: req.body.title,
      text: req.body.text || null
    });

    message.save()
      .then((message) => resolve(res.json(message)))
      .catch((err) => reject(err));
  });
});

postingRouter.get('/api/posting/all', bearerAuth, jsonParser, (req, res) => {
  debug('GET: /api/posting/all');

  return new Promise((resolve, reject) => {
    if(!req.user || !req.user._id) return reject(createError(401, 'unauthorized: json web token failure, your token either doesn\'t exist or is invalid'));

    Posting.find({})
      .then((postings) => {
        if(!postings) return reject(createError(404, 'not found: no messages were found:', postings));
        resolve(res.json(postings));
      })
      .catch((err) => reject(err));
  });
});

postingRouter.get('/api/posting/self', bearerAuth, jsonParser, (req, res) => {
  debug('GET: /api/posting/self');

  return new Promise((resolve, reject) => {
    if(!req.user || !req.user._id) return reject(createError(401, 'unauthorized: json web token failure, your token saved in cookies does not match your user id'));

    Posting.find({'authorId': req.user._id})
      .then((postings) => {
        if(!postings) return reject(createError(404, 'not found: no messages were found:', postings));
        resolve(res.json(postings));
      })
      .catch((err) => reject(err));
  });
});
postingRouter.get('/api/posting/:id', bearerAuth, jsonParser, (req, res) => {
  debug('GET: /api/posting/:id');

  return new Promise((resolve, reject) => {
    if(!req.params._id) return reject(createError(400, 'an _id must be provided, got:', req.params._id));
    if(!req.user || !req.user._id) return reject(createError(401, 'unauthorized: json web token failure, your token saved in cookies does not match your user id'));

    Posting.findById({'_id': req.params.id})
      .then((posting) => {
        if(!posting) return reject(createError(404, 'not found: no message was found:', posting));
        resolve(res.json(posting));
      })
      .catch((err) => reject(err));
  });
});

postingRouter.put('/api/posting/edit/:id', bearerAuth, jsonParser, (req, res) => {
  debug('PUT: /api/posting/edit/:id');

  return new Promise((resolve, reject) => {
    if(!req.params.id) return reject(createError(400, 'an _id must be provided, got:', req.params._id));
    if(!req.body || (!req.body.photos && (!req.body.title && !req.body.text))) return reject(createError(400, 'bad request: missing minimum content requirments'));
    if(!req.user || !req.user._id) return reject(createError(401, 'unauthorized: json web token failure, your token saved in cookies does not match your user id'));

    Posting.findById({'_id': req.params.id})
      .then((posting) => {
        if(!posting) return reject(createError(404, 'not found: no message was found:', posting));
        if(req.user._id != posting.authorId) return reject(createError(401, 'unauthorized: json web token failure, your token saved in cookies does not match your user id'));

        if(req.body.title) posting.title = req.body.title;
        if(req.body.text) posting.text = req.body.text;
        posting.updated_at = Date.now();
        posting.save();
        return posting;
      })
      .then((posting) => resolve(res.json(posting)));
  });
});

postingRouter.delete('/api/posting/remove/:id', bearerAuth, jsonParser, (req, res) => {
  debug('DELETE: /api/posting/remove/:id');

  return new Promise((resolve, reject) => {
    if(!req.user || !req.user._id) return reject(createError(401, 'unauthorized: json web token failure, your token saved in cookies does not match your user id'));

    Posting.findById({'_id': req.params.id})
      .then((posting) => {
        if(!posting) return reject(createError(404, 'not found: no message was found:', posting));
        if(req.user._id != posting.authorId) return reject(createError(401, 'unauthorized: json web token failure, your token saved in cookies does not match your user id'));

        if(posting.next.length > 0){
          Posting.deleteAllChildren()
            .then(() => {
              Posting.deleteOne({'_id': req.params._id})
                .then(() => resolve(res.status(204).send()))
                .catch((err) => reject(createError(500, 'failed delete', err)));
            })
            .catch((err) => reject(createError(500, 'failed delete', err)));
        }else{
          Posting.deleteOne({'_id': req.params._id})
            .then(() => resolve(res.status(204).send()))
            .catch((err) => reject(createError(500, 'failed delete', err)));
        }
      });
  });
});
