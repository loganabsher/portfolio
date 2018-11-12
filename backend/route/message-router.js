'use strict';

const debug = require('debug')('Backend-Portfolio:message-router.js');

const Router = require('express').Router;

const jsonParser = require('body-parser').json();
const bearerAuth = require('../lib/bearer-auth-middleware.js');
const Message = require('../model/Message.js');
const messageRouter = module.exports = Router();

messageRouter.post('/api/message', bearerAuth, jsonParser, (req, res, next) => {
  debug('POST: /api/message');


});

messageRouter.get('/api/message/all', bearerAuth, (req, res, next) => {
  debug('GET: /api/message/all');


});

messageRouter.get('/api/message/self', bearerAuth, (req, res, next) => {
  debug('GET: /api/message/self');


});

messageRouter.get('/api/message/:id', bearerAuth, (req, res, next) => {
  debug('GET: /api/message/:id');


});

messageRouter.put('/api/message/edit/:id', bearerAuth, jsonParser, (req, res, next) => {
  debug('PUT: /api/message/edit/:id');


});

messageRouter.delete('/api/message/remove/:id', bearerAuth, (req, res, next) => {
  debug('DELETE: /api/message/remove/:id')
});
