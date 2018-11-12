'use strict';

const debug = require('debug')('Backend-Portfolio:user-router.js');

const jsonParser = require('body-parser').json();
const Router = require('express').Router;
const Promise = require('bluebird');
const createError = require('http-errors');

const basicAuth = require('../lib/basic-auth-middleware.js');

const User = require('../model/User.js');
const userRouter = module.exports = Router();

// NOTE: need to add some sort of email authentication
userRouter.post('/api/signup', jsonParser, (req, res, next) => {
  debug('POST: /api/signup');

  let password = req.body.password;
  delete req.body.password;

  user.find({email: req.body.email, password: password})
  .then((user) => {
    // NOTE: this is just temporary until I create something to authenticate their email
    if(user) return Promise.reject(createError(500, 'this email is already being used'));
    else{
      let user = new User(req.body);

      user.generatePasswordHash(password)
        .then((user) => user.generateToken())
        .then((token) => {
          res.cookie('portfolio-login-token', token, {maxAge: 900000000});
          res.json(token);
        });
    }
  })
  .catch(next);
});

userRouter.get('/api/login', basicAuth, (req, res, next) => {
  debug('GET: /api/login');

  User.findOne({email: req.auth.email})
    .then((user) => {
      if(!user) return Promise.reject(createError(401, 'user not found'));
      return user.comparePasswordHash(req.auth.password);
    })
    .then((user) => {
      user.generateToken()
        .then((token) => {
          let cookieOptions = {maxAge: 900000000};
          res.cookie('portfolio-login-token', token, cookieOptions);
          // NOTE: this needs to be removed for production, changed return to token
          res.json(user);
        });
    })
    .catch(next);
});

userRouter.get('/api/allaccounts', (req, res, next) => {
  debug('GET: /api/allaccounts');

  User.find({})
    .then((all) => {
      let tempArr = [];
      all.forEach((ele) => tempArr.push(ele.email));
      res.json(tempArr);
    })
    .catch(next);
});

// NOTE: need to change from findbyid to find by email/user
userRouter.put('/api/updatepassword/:id', basicAuth, jsonParser, (req, res, next) => {
  debug('PUT: /api/updatepassword/:id');

  User.findById(req.params.id)
    .then((user) => {
      if(!user) return Promise.reject(createError(404, 'not found'));
      return user.comparePasswordHash(req.auth.password)
    })
    .then((user) => {
      user.generatePasswordHash(req.body.password)
        .then((user) => user.generateToken())
        .then((token) => {
          res.cookie('portfolio-login-token', token, {maxAge: 900000000});
          res.json(token);
        });
    })
    .catch(next);
});

userRouter.delete('/api/deleteaccount/:id', basicAuth, (req, res, next) => {
  debug('DELETE: /api/deleteaccount/:id');

  let id = {'_id': req.params.id};
  User.findById(id)
    .then((user) => {
      if(!user) return Promise.reject(createError(404, 'not found'));
    })
    .then(() => {
      User.deleteOne(id)
        .then((token) => res.json(token));
    })
    .catch(next);
});
