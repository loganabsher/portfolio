'use strict';

const debug = require('debug')('Backend-Portfolio:basic-auth-middleware.js');

const createError = require('http-errors');

module.exports = (req, res, next) => {
  debug('basic auth');

  let authHeader = req.headers.authorization;
  console.log('BASIC',req.headers.authorization);
  if(!authHeader) return next(createError(401, 'authorization header required'));

  let base64str = authHeader.split('Basic ')[1];
  if(!base64str) return next(createError(401, 'email and password required'));

  let utf8str = new Buffer(base64str, 'base64').toString();
  let authArr = utf8str.split(':');

  req.auth = {
    email: authArr[0],
    password: authArr[1]
  };

  if(!req.auth.email) return next(createError(401, 'email required'));
  if(!req.auth.password) return next(createError(401, 'password required'));

  next();
};
