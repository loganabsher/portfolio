'use strict';

const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const debug = require('debug')('credibleEdibles:bearerAuth');

const User = require('../model/user.js');

module.exports = (req, res, next) => {
  debug('bearer auth');

  let authHeader = req.headers.authorization;
  console.log(authHeader);
  if(!authHeader) return next(createError(401, 'authorization header required'));

  let token = authHeader.split('Bearer ')[1];
  if(!token) return next(createError(401, 'token required'));

  jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
    if(err) return next(err);

    User.findOne({ findHash: decoded.token })
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => next(createError(401, err.message)));
  });
};
