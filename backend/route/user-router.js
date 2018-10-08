'use strict';

const debug = require('debug')('Portfolio:user-router.js');
const jsonparser = require('body-parser').json();
const Router = require('express').Router;
const Promise = require('bluebird');

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
      res.cookie('Special-Cookie', token, {maxAge: 900000000});
      res.json(token);
    })
    .catch(next);

});
