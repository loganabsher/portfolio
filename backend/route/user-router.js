'use strict';

const debug = require('debug')('Backend-Portfolio:user-router.js');

const jsonParser = require('body-parser').json();
const Router = require('express').Router;
const createError = require('http-errors');
const jwt = require('jsonwebtoken');

const basicAuth = require('../lib/basic-auth-middleware.js');
const User = require('../model/User.js');
const Profile = require('../model/Profile.js');

const userRouter = module.exports = Router();

// NOTE: need to add some sort of email authentication
userRouter.post('/api/signup', jsonParser, (req, res, next) => {
  debug('POST: /api/signup');

  let password = req.body.password;
  delete req.body.password;

  User.findOne({'email': req.body.email})
    .then((user) => {
      if(user){
        if(user.authenticated){
          // NOTE: maybe update all error codes and texts to be very specific
          next(createError(400, 'bad request: this email is already used, please log in with your password'));
        }else{
          user.generatePasswordHash('normal', password)
            .then((user) => user.generateToken())
            .then((token) => res.json(token))
            // NOTE: should come back a revisit this, see if there is any real difference between having console.error(err) rather than just returning err
            .catch((err) => next(console.error(err)));
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
          .catch((err) => next(console.error(err)));
      }
    })
    .catch((err) => next(console.error(err)));
});

userRouter.get('/api/login', basicAuth, (req, res, next) => {
  debug('GET: /api/login');

  User.findOne({'email': req.auth.email})
    .then((user) => {
      if(!user) next(createError(401, 'user not found'));
      return user.comparePasswordHash('normal', req.auth.password);
    })
    .then((user) => user.generateToken())
    .then((token) => res.json(token))
    .catch((err) => next(console.error(err)));
});

userRouter.put('/api/updatepassword', basicAuth, jsonParser, (req, res, next) => {
  debug('PUT: /api/updatepassword');

  User.findOne({'email': req.auth.email})
    .then((user) => {
      // NOTE: the inconsistancy here is killing me, come through here later and make everything uniform
      if(!user) next(createError(404, 'not found'));
      return user.comparePasswordHash('normal', req.auth.password);
    })
    .then((user) => user.generatePasswordHash('normal', req.body.password))
    .then((user) => user.generateToken())
    .then((token) => res.json(token))
    .catch((err) => next(console.error(err)));
});

// NOTE: should probably add some sort of wait method that waits a few weeks before actually deleting the account and rather just have it be disabled, kinda like what facebook does
userRouter.delete('/api/deleteaccount', basicAuth, (req, res, next) => {
  debug('DELETE: /api/deleteaccount');

  User.findOne({'email': req.auth.email})
    .then((user) => {
      if(!user) next(createError(404, 'not found'));
      return user.comparePasswordHash('normal', req.auth.password);
    })
    .then((user) => {
      if(user.profileId) Profile.deleteOne({'_id': user.profileId});
      return user;
    })
    .then((user) => user.handleUserDelete())
    .then((user) => {
      User.deleteOne({'_id': user._id})
        .then(() => res.status(204).send());
    })
    .catch((err) => next(console.error(err)));
});

// NOTE: this seems to be a bad way of checking if someone is authenticated
userRouter.get('/api/checkCookie', (req, res) => {
  debug('GET: /api/checkCookie');

  let authHeader = req.headers.authorization;
  if(authHeader){
    let token = authHeader.split('Bearer ')[1];
    jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
      console.log(err, decoded);
      if(err) return res.status(400).send();
      User.findOne({findHash: decoded.token})
        .then(() => res.json(token))
        .catch(() => res.status(400).send());
    });
  }else{
    res.status(400).send();
  }
});
