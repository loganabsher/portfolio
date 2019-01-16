'use strict';

const debug = require('debug')('Backend-Portfolio:user-router.js');

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Promise = require('bluebird');
const createError = require('http-errors');

const bearerAuth = require('../lib/bearer-auth-middleware.js');
const User = require('../model/User.js');
const Profile = require('../model/Profile.js');

const profileRouter = module.exports = Router();

profileRouter.post('/api/profile', bearerAuth, jsonParser, (req, res, next) => {
  debug('POST: /api/profile');

  if(!req.body || !req.body.userId) return next(createError(400, 'missing userId field'));

  let profile = new Profile(req.body);

  profile.connectProfileAndUser(req.body.userId)
    .then((profile) => res.json(profile))
    .catch(next);
});

profileRouter.get('/api/profile/:id', bearerAuth, jsonParser, (req, res, next) => {
  debug('GET: /api/profile/:id');

  if(!req.params || !req.params.id) return next(createError(400, 'missing profileId field'));

  // NOTE: should really find by user id rather than profile id since each user only has one profile
  Profile.findById(req.params.id)
    .then((profile) => {
      // NOTE: make better http error
      if(!profile) return Promise.reject(createError(400, 'no profile found'));
      res.json(profile);
    })
    .catch(next);
});

profileRouter.put('/api/profile/edit/:id', bearerAuth, jsonParser, (req, res, next) => {
  debug('PUT: /api/profile/edit/:id');

  // NOTE: better errors needed
  if(!req.params || !req.params.id) return next(createError(400, 'missing profileId field'));
  if(!req.body) return next(createError(400, 'bad request'));

  Profile.findById(req.params.id)
    .then((profile) => {
      if(!profile) return Promise.reject(createError(400, 'no profile found'));
      if(req.body.firstName) profile.firstName = req.body.firstName;
      if(req.body.lastName) profile.lastName = req.body.lastName;
      if(req.body.userName) profile.userName = req.body.userName;
      profile.save();
      res.json(profile);
    })
    .catch(next);
});

profileRouter.delete('/api/profile/delete/:id', bearerAuth, jsonParser, (req, res,next) => {
  debug('DELETE: /api/profile/delete/:id');

  if(!req.params || !req.params.id) return next(createError(400, 'missing profileId field'));

  let id = {'_id': req.params.id};
  Profile.findById(id)
    .then((profile) => {
      if(!profile) return Promise.reject(createError(400, 'no profile found'));
      if(!profile.userId) return Promise.reject(createError(500, 'some shit is VERY wrong'));
      profile.disconnectProfileAndUser(profile.userId)
        .then(() => Profile.deleteOne(id))
        .then(() => res.status(204).send())
        .catch(next);
    })
    .catch(next);
});
