'use strict';

const debug = require('debug')('Backend-Portfolio:user-router.js');

const jsonParser = require('body-parser').json();
const Router = require('express').Router;
const Promise = require('bluebird');
const createError = require('http-errors');

const basicAuth = require('../lib/basic-auth-middleware.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');
const User = require('../model/User.js');
const Profile = require('../model/Profile.js');
const Message = require('../model/Message.js');

const userRouter = module.exports = Router();

// NOTE: need to add some sort of email authentication
userRouter.post('/api/signup', jsonParser, (req, res, next) => {
  debug('POST: /api/signup');

  let password = req.body.password;
  delete req.body.password;

  User.findOne({email: req.body.email})
    .then((user) => {
      // NOTE: this is just temporary until I create something to authenticate their email
      if(user){
        if(user.authenticated){
          // NOTE: maybe update all error codes and texts to be very specific
          return Promise.reject(createError(400, 'this email is already used, please log in with your password'));
        }else{
          user.generatePasswordHash('normal', password)
            .then((user) => user.generateToken())
            .then((token) => res.json(token))
            .catch(next);
        }
      }
      else{
        debug('setting up new user');
        let user = new User({
          googlePermissions: {authenticated: false, password: null},
          facebookPermissions: {authenticated: false, password: null},
          twitterPermissions: {authenticated: false, password: null},
          authenticated: true,
          email: req.body.email
        });

        user.generatePasswordHash('normal', password)
          .then((user) => user.generateToken())
          .then((token) => res.json(token))
          .catch(next);
      }
    })
    .catch(next);
});

userRouter.get('/api/login', basicAuth, (req, res, next) => {
  debug('GET: /api/login');

  User.findOne({email: req.auth.email})
    .then((user) => {
      if(!user) return Promise.reject(createError(401, 'user not found'));
      return user.comparePasswordHash('normal', req.auth.password);
    })
    .then((user) => user.generateToken())
    .then((token) => {
      res.cookie('portfolio-login-token', token, {maxAge: 900000000});
      res.json(token);
    })
    .catch(next);
});

// userRouter.get('/api/userexisits/:id', (req, res, next) => {
//   debug('GET: /api/userexisits/:id');
//
//   User.findById(req.params.id)
//     .then((user) => {
//       if(user) res.status(204).send();
//       else{
//         res.status(404).send();
//       }
//     })
//     .catch(next);
// });

// NOTE: this should really have some sort of authentication
// userRouter.get('/api/allaccounts', (req, res, next) => {
//   debug('GET: /api/allaccounts');
//
//   User.find({})
//     .then((users) => res.json(users))
//     .catch(next);
// });

// NOTE: need to change from findbyid to find by email/user
// // NOTE: this also probably needs email auth
userRouter.put('/api/updatepassword', basicAuth, jsonParser, (req, res, next) => {
  debug('PUT: /api/updatepassword');

  if(!req.body || !req.body.password) return next(createError(400, 'password must be provided'));

  User.findOne({email: req.auth.email})
    .then((user) => {
      if(!user) return Promise.reject(createError(404, 'not found'));
      return user.comparePasswordHash('normal', req.auth.password);
    })
    .then((user) => {
      user.generatePasswordHash('normal', req.body.password)
        .then((user) => user.generateToken())
        .then((token) => res.cookie('portfolio-login-token', token, {maxAge: 900000000}));
    })
    .catch(next);
});

// NOTE: should probably add some sort of wait method that waits a few weeks before actually deleting the account and rather just have it be disabled, kinda like what facebook does
userRouter.delete('/api/deleteaccount', basicAuth, (req, res, next) => {
  debug('DELETE: /api/deleteaccount');
  // NOTE: I'm trying to decide if bearerAuth would be a good idea in this and the update password querys

  User.findOne({email: req.auth.email})
    .then((user) => {
      if(!user) return Promise.reject(createError(404, 'not found'));
      return user.comparePasswordHash('normal', req.auth.password);
    })
    .then((user) => {
      if(user.profileId) Profile.deleteOne({'_id': user.profdileId});
      return user;
    })
    .then((user) => {
      Message.deleteMany({authorId: user.id});
      return user;
    })
    .then((user) => {
      User.findByIdAndRemove({'_id': user._id})
        .then(() => res.status(204).send())
        .catch(next);
    })
    .catch(next);
});
