'use strict';

const debug = require('debug')('Backend-Portfolio:user-router.js');

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');

const bearerAuth = require('../lib/bearer-auth-middleware.js');
const Profile = require('../model/Profile.js');

const profileRouter = module.exports = Router();

profileRouter.post('/api/profile', bearerAuth, jsonParser, (req, res, next) => {
  debug('POST: /api/profile');

  if(!req.user || !req.user._id) return next(createError(401, 'unauthorized: json web token failure, your token either doesn\'t exist or is invalid'));
  if(!req.body || (!req.body.first_name && !req.body.last_name && !req.body.user_name)) return next(createError(400, 'bad request: request did not meet minimum information requirements'));

  const profile = new Profile(req.body);

  profile.connectProfileAndUser(req.user._id)
    .then((profile) => res.json(profile))
    .catch(next);
});

profileRouter.get('/api/profile/self', bearerAuth, jsonParser, (req, res, next) => {
  debug('GET: /api/profile/self');

  if(!req.user.profile_id) return next(createError(404, 'not found: this user has no profile'));
  if(!req.user || !req.user._id) return next(createError(401, 'unauthorized: json web token failure, your token either doesn\'t exist or is invalid'));

  Profile.findById({'_id': req.user.profile_id})
    .then((profile) => {
      if(!profile) return next(createError(500, 'internal server error: this user has an id, but no profile was found'));
      res.json(profile);
    })
    .catch(next);
});

profileRouter.put('/api/profile/edit', bearerAuth, jsonParser, (req, res, next) => {
  debug('PUT: /api/profile/edit');

  if(!req.user.profile_id) return next(createError(404, 'not found: this user has no profile'));
  if(!req.body || (!req.body.first_name && !req.body.last_name && !req.body.user_name)) return next(createError(400, 'bad request: request did not meet minimum information requirements'));
  if(!req.user || !req.user._id) return next(createError(401, 'unauthorized: json web token failure, your token either doesn\'t exist or is invalid'));

  let fields = {};

  if(req.body.first_name) fields.first_name = req.body.first_name;
  if(req.body.last_name) fields.last_name = req.body.last_name;
  if(req.body.user_name) fields.user_name = req.body.user_name;

  Profile.findOneAndUpdate({'_id': req.user.profile_id}, fields)
    .then((profile) => {
      if(!profile) return next(createError(500, 'internal server error: this user has an id, but no profile was found'));
      res.json(profile);
    })
    .catch(next);
});

profileRouter.delete('/api/profile/delete', bearerAuth, (req, res, next) => {
  debug('DELETE: /api/profile/delete');

  if(!req.user.profile_id) return next(createError(404, 'not found: this user has no profile'));
  if(!req.user || !req.user._id) return next(createError(401, 'unauthorized: json web token failure, your token either doesn\'t exist or is invalid'));

  Profile.findById({'_id': req.user.profile_id})
    .then((profile) => {
      if(profile._id != req.user.profile_id) return next(createError(401, 'unauthorized: you are not authorized to delete this profile'));
      if(!profile) return next(createError(500, 'internal server error: this user has an id, but no profile was found'));

      let profile_id = req.user.profile_id;
      profile.disconnectProfileAndUser(req.user._id)
        .then(() => Profile.findByIdAndRemove({'_id': profile_id}))
        .then(() => res.status(204).send())
        .catch(next);
    })
    .catch(next);
});
