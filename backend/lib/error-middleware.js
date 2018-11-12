'use strict';

const debug = require('debug')('Backend-Portfolio:error-middleware.js');

const createError = require('http-errors');

module.exports = function(err, req, res, next) {
  debug('error-middleware');

  console.error('name: ', err.name);
  console.error('msg: ', err.message);

  if(err.name === 'CastError'){
    err = createError(404, err.message);
    res.status(err.status).send(err.message);
    return next();
  }

  if(err.name === 'ValidationError'){
    err = createError(400, err.message);
    res.status(err.status).send(err.message);
    return next();
  }


  if(err.name === 'Error'){
    err = createError(400, err.message);
    res.status(err.status).send(err.message);
    return next();
  }

  if(err.status) {
    debug('user error');
    res.status(err.status).send(err.message);
    return next();
  }

  debug('server error');
  err = createError(500, err.message);
  res.status(err.status).send(err.name);
  return next();
};
