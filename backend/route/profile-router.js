'use strict';

const debug = require('debug')('Backend-Portfolio:user-router.js');

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Promise = require('bluebird');
const createError = require('http-errors');

const bearerAuth = require('../lib/bearer-auth-middleware.js');
const Profile = require('../model/Profile.js');

const profileRouter = module.exports = Router();


// NOTE: this page is very much unfinished, I need to think more about the best way to do this moving forward


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
    .then((profile) => res.json(profile))
    .catch(next);
});

profileRouter.put('/api/profile/edit/:id', bearerAuth, jsonParser, (req, res, next) => {

});
