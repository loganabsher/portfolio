'use strict';

const debug = require('debug')('Backend-Portfolio:user-router.js');

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Promise = require('bluebird');
const createError = require('http-errors');

const bearerAuth = require('../lib/bearer-auth-middleware.js');
// const User = require('../model/User.js');
const Profile = require('../model/Profile.js');

const profileRouter = module.exports = Router();

profileRouter.post('/api/profile', bearerAuth, jsonParser, (req, res, next) => {
  debug('POST: /api/profile');

  if(!req.user || !req.user._id) return next(createError(400, 'no user found for this token'));

  let profile = new Profile(req.body);

  profile.connectProfileAndUser(req.user._id)
    .then((profile) => res.json(profile))
    .catch(next);
});

profileRouter.get('/api/profile/fetch', bearerAuth, jsonParser, (req, res, next) => {
  debug('GET: /api/profile/fetch');

  if(!req.user || !req.user._id) return next(createError(400, 'no user found for this token'));
  if(!req.user.profileId) return next(createError(404, 'this user has no profile id'));

  Profile.findById({_id: req.user.profileId})
    .then((profile) => {
      if(!profile) return next(createError(400, 'no profile found'));
      res.json(profile);
    })
    .catch(next);
});

profileRouter.put('/api/profile/edit', bearerAuth, jsonParser, (req, res, next) => {
  debug('PUT: /api/profile/edit');

  if(!req.user || !req.user._id) return next(createError(400, 'no user found for this token'));
  if(!req.user.profileId) return next(createError(404, 'this user has no profile id'));
  if(!req.body) return next(createError(400, 'bad request'));

  Profile.findById({_id: req.user.profileId})
    .then((profile) => {
      if(!profile) return next(createError(400, 'no profile found'));
      if(profile._id !== req.user.profileId) return next(createError(401, 'you are not authorized to edit this profile'));

      if(req.body.firstName) profile.firstName = req.body.firstName;
      if(req.body.lastName) profile.lastName = req.body.lastName;
      if(req.body.userName) profile.userName = req.body.userName;
      profile.save();
      res.json(profile);
    })
    .catch(next);
});

profileRouter.delete('/api/profile/delete', bearerAuth, jsonParser, (req, res,next) => {
  debug('DELETE: /api/profile/delete');

  if(!req.user || !req.user._id) return next(createError(400, 'no user found for this token'));
  if(!req.user.profileId) return next(createError(404, 'this user has no profile id'));

  Profile.findById({_id: req.user.profileId})
    .then((profile) => {
      if(!profile) return next(createError(400, 'no profile found'));
      profile.disconnectProfileAndUser(req.user._id)
        .then(() => Profile.findByIdAndRemove({_id: req.user._id}))
        .then(() => res.status(204).send())
        .catch(next);
    })
    .catch(next);
});
