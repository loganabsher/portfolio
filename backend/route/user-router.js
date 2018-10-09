'use strict';

const debug = require('debug')('Portfolio:user-router.js');
const jsonParser = require('body-parser').json();
const Router = require('express').Router;
const Promise = require('bluebird');
const createError = require('http-errors');

const basicAuth = require('../lib/basic-auth.js');

const User = require('../model/User.js');
const userRouter = module.exports = Router();

userRouter.post('/api/signup', jsonParser, (req, res, next) => {
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

  console.log(req.auth.password);
  console.log(req.auth.email);
  User.findOne({email: req.auth.email})
    .then((user) => {
      if(!user) return Promise.reject(createError(401, 'user not found'));
      return user.comparePasswordHash(req.auth.password);
    })
    .then((user) => {
      user.generateToken()
        .then((token) => {
          let cookieOptions = {maxAge: 900000000};
          res.cookie('login-token', token, cookieOptions);
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

userRouter.put('/api/editaccount/:id', basicAuth, jsonParser, (req, res, next) => {
  debug('PUT: /api/editaccount/:id');

  User.findById(req.params.id)
    .then((user) => {
      if(!user) return Promise.reject(createError(404, 'not found'));
    })
    .then(() => {
      User.findOneAndUpdate(req.params.id, req.body, {new: true})
        .then((token) => res.json(token));
    })
    .catch(next);
});

userRouter.delete('/api/deleteaccount/:id', basicAuth, (req, res, next) => {
  debug('DELETE: /api/deleteaccount/:id');

  let id = {'_id': req.params.id};
  console.log(id);
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
