'use strict';

const debug = require('debug')('Portfolio:user-router.js');
const jsonparser = require('body-parser').json();
const Router = require('express').Router;
const Promise = require('bluebird');
const createError = require('http-errors');

const basicAuth = require('../lib/basic-auth.js');

const User = require('../model/User.js');
const userRouter = module.exports = Router();

userRouter.post('/api/signup', jsonparser, (req, res, next) => {
  debug('POST: /api/signup');

  let password = req.body.password;
  delete req.body.password;

  let user = new User(req.body);

  user.generatePasswordHash(password)
    .then((user) => user.save())
    .then((user) => user.generateToken())
    .then((token) => {
      res.cookie('login-token', token, {maxAge: 900000000});
      res.json(token);
    })
    .catch(next);
});

userRouter.get('/api/login', basicAuth, (req, res, next) => {
  debug('GET: /api/login');

  User.findOne({username: req.auth.username})
    .then((user) => {
      if(!user) return Promise.reject(createError(401, 'invalid username'));
      return user.comparePasswordHash(req.auth.password);
    })
    .then((user) => {
      user.generateToken()
        .then((token) => {
          let cookieOptions = {maxAge: 900000000};
          res.cookie('login-token', token, cookieOptions);
          res.json(token);
        });
    })
    .catch(next);
});

userRouter.get('/api/allaccounts', (req, res, next) => {
  debug('GET: /api/allaccounts');

  User.find({})
    .then((all) => {
      let tempArr = [];
      all.forEach((ele) => tempArr.push(ele.username));
      res.json(tempArr);
    })
    .catch(next);
});
