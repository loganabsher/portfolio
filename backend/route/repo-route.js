'use strict';

const Router = require('express').Router;
const request = require('superagent');
const jsonParser = require('body-parser').json();
const createErrors = require('http-errors');

const repoRouter = exports = module.exports = Router();

repoRouter.post('/api/repositories', (req, res, next) => {

});

repoRouter.get('/api/repositories', (req, res, next) => {

});
