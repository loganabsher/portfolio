'use strict';

const debug = require('debug')('Backend-Portfolio:user-router.js');
const jsonParser = require('body-parser').json();
const Router = require('express').Router;
const Promise = require('bluebird');
const createError = require('http-errors');
const superagent = require('superagent');

const basicAuth = require('../lib/basic-auth.js');

const User = require('../model/User.js');
const userRouter = module.exports = Router();

userRouter.get('/oauth/google/code', (req, res) => {
  if(!req.query.code) {
    res.redirect(process.env.CLIENT_URL);
  }else{
    superagent.post('https://www.googleapis.com/oauth2/v4/token')
      .type('form')
      .send({
        code: req.query.code,
        grant_type: 'authorization_code',
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: `${process.env.API_URL}/oauth/google/code`
      })
      .then((res) => {
        return superagent.get('https://www.googleapis.com/plus/v1/people/me/openIdConnect')
          .set('Authorization', `Bearer ${res.body.access_token}`);
      })
      .then((res) => {
        return User.handleOAUTH(res.body);
      })
      .then((user) => user.tokenCreate())
      .then((token) => {
        res.cookie('Special-Cookie', token);
        res.redirect(process.env.CLIENT_URL);
      })
      .catch((error) => {
        console.error(error);
        res.redirect(process.env.CLIENT_URL);
      });
  }
});

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
