'use strict';

const debug = require('debug')('Backend-Portfolio:user-router.js');

const jsonParser = require('body-parser').json();
const Router = require('express').Router;
const Promise = require('bluebird');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');

const basicAuth = require('../lib/basic-auth-middleware.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');
const User = require('../model/User.js');
const Profile = require('../model/Profile.js');
const Message = require('../model/Message.js');

const userRouter = module.exports = Router();

// NOTE: need to add some sort of email authentication
userRouter.post('/api/signup', jsonParser, (req, res) => {
  debug('POST: /api/signup');

  let password = req.body.password;
  delete req.body.password;

  return new Promise((resolve, reject) => {
    User.findOne({'email': req.body.email})
      .then((user) => {
        if(user){
          if(user.authenticated){
            // NOTE: maybe update all error codes and texts to be very specific
            reject(createError(400, 'this email is already used, please log in with your password'));
          }else{
            user.generatePasswordHash('normal', password)
              .then((user) => user.generateToken())
              .then((token) => resolve(res.json(token)))
              .catch((err) => reject(console.error(err)));
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
            .then((token) => resolve(res.json(token)))
            .catch((err) => reject(console.error(err)));
        }
      })
      .catch((err) => reject(console.error(err)));
  });
});

userRouter.get('/api/login', basicAuth, (req, res) => {
  debug('GET: /api/login');

  return new Promise((resolve, reject) => {
    User.findOne({'email': req.auth.email})
      .then((user) => {
        if(!user) reject(createError(401, 'user not found'));
        return user.comparePasswordHash('normal', req.auth.password);
      })
      .then((user) => user.generateToken())
      .then((token) => resolve(token))
      .catch((err) => reject(console.error(err)));
  })
    .then((token) => res.json(token));
});

userRouter.put('/api/updatepassword', basicAuth, jsonParser, (req, res) => {
  debug('PUT: /api/updatepassword');

  return new Promise((resolve, reject) => {
    User.findOne({'email': req.auth.email})
      .then((user) => {
        if(!user) reject(createError(404, 'not found'));
        return user.comparePasswordHash('normal', req.auth.password);
      })
      .then((user) => user.generatePasswordHash('normal', req.body.password))
      .then((user) => user.generateToken())
      .then((token) => resolve(token))
      .catch((err) => reject(console.error(err)));
  })
    .then((token) => res.json(token));
});

// NOTE: should probably add some sort of wait method that waits a few weeks before actually deleting the account and rather just have it be disabled, kinda like what facebook does
userRouter.delete('/api/deleteaccount', basicAuth, (req, res) => {
  debug('DELETE: /api/deleteaccount');

  return new Promise((resolve, reject) => {
    User.findOne({'email': req.auth.email})
      .then((user) => {
        if(!user) reject(createError(404, 'not found'));
        return user.comparePasswordHash('normal', req.auth.password);
      })
      .then((user) => {
        if(user.profileId) Profile.deleteOne({'_id': user.profileId});
        return user;
      })
      .then((user) => {
        Message.deleteMany({'authorId': user._id});
        return user;
      })
      .then((user) => {
        User.deleteOne({'_id': user._id})
          .then(() => resolve(204));
      })
      .catch((err) => reject(console.error(err)));
  })
    .then((status) => res.status(status).send());
});

userRouter.get('/api/checkCookie', (req, res) => {
  debug('GET: /api/checkCookie');

  let authHeader = req.headers.authorization;
  if(authHeader){
    let token = authHeader.split('Bearer ')[1];
    jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
      console.log(err, decoded)
      if(err) return res.status(400).send();
      User.findOne({findHash: decoded.token})
        .then(() => res.json(token))
        .catch(() => res.status(400).send());
    });
  }else{
    res.status(400).send();
  }
});
