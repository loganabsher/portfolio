'use strict';

const debug = require('debug')('Backend-Portfolio:user-router.js');

const jsonParser = require('body-parser').json();
const Router = require('express').Router;
const Promise = require('bluebird');
const createError = require('http-errors');

const basicAuth = require('../lib/basic-auth-middleware.js');
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
      // NOTE: this is interesting, because if they are already authenticated with google, facebook
      // or twitter, then what will happen when they try to sign up normally, I think I need to add
      // some sort of catch for if they are already authenticated
      if(user) return Promise.reject(createError(500, 'this email is already being used'));
      else{
        debug('setting up new user');
        let user = new User({
          googlePermissions: {authenticated: false, password: null},
          facebookPermissions: {authenticated: false, password: null},
          twitterPermissions: {authenticated: false, password: null},
          email: req.body.email
        });

        user.generatePasswordHash('normal', password)
          .then((user) => user.generateToken())
          .then((token) => res.send({user: user, token: token}));
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
    .then((user) => {
      user.generateToken()
        .then((token) => {
          let cookieOptions = {maxAge: 900000000};
          res.cookie('portfolio-login-token', token, cookieOptions);
          // NOTE: this needs to be removed for production, changed return to token
          res.send({user: user, token: token});
        });
    })
    .catch(next);
});

userRouter.get('/api/userexisits/:id', (req, res, next) => {
  debug('GET: /api/userexisits/:id');

  User.findById(req.params.id)
    .then((user) => {
      if(user) res.status(204).send();
      else{
        res.status(404).send();
      }
    })
    .catch(next);
});

// NOTE: this should really have some sort of authentication
userRouter.get('/api/allaccounts', (req, res, next) => {
  debug('GET: /api/allaccounts');

  User.find({})
    .then((users) => res.json(users))
    .catch(next);
});

// NOTE: need to change from findbyid to find by email/user
userRouter.put('/api/updatepassword/:id', basicAuth, jsonParser, (req, res, next) => {
  debug('PUT: /api/updatepassword/:id');

  User.findById(req.params.id)
    .then((user) => {
      if(!user) return Promise.reject(createError(404, 'not found'));
      return user.comparePasswordHash('normal', req.auth.password);
    })
    .then((user) => {
      user.generatePasswordHash('normal', req.body.password)
        .then((user) => user.generateToken())
        .then((token) => {
          res.cookie('portfolio-login-token', token, {maxAge: 900000000});
          res.json(user);
        });
    })
    .catch(next);
});

// NOTE: should probably add some sort of wait method that waits a few weeks before actually deleting the account and rather just have it be disabled, kinda like what facebook does
userRouter.delete('/api/deleteaccount/:id', basicAuth, (req, res, next) => {
  debug('DELETE: /api/deleteaccount/:id');

  let id = {'_id': req.params.id};
  User.findById(id)
    .then((user) => {
      if(!user) return Promise.reject(createError(404, 'not found'));
      return user.comparePasswordHash('normal', req.auth.password);
    })
    .then((user) => {
      if(user.profileId) Profile.deleteOne({'_id': user.profileId});
      return user;
    })
    .then((user) => {
      Message.deleteMany({authorId: user.id});
    })
    .then(() => {
      User.deleteOne(id)
        .then(() => res.status(204).send());
    })
    .catch(next);
});
