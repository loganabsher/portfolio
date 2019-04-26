'use strict';

const debug = require('debug')('Backend-Portfolio:auth-router.js');

const Router = require('express').Router;
const superagent = require('superagent');
const uuidv1 = require('uuid/v1');
const uuidv4 = require('uuid/v4');

const User = require('../model/User.js');

const authRouter = module.exports = Router();

authRouter.get('/oauth/google/code', (req, res) => {
  debug('GET: /oauth/google/code');

  if(!req.query.code) {
    res.redirect(process.env.CLIENT_URL);
  }else{
    debug('POST: /oauth2/v4/token');
    superagent.post('https://www.googleapis.com/oauth2/v4/token')
      .type('form')
      .send({
        code: req.query.code,
        grant_type: 'authorization_code',
        client_id: process.env.GOOGLE_APP_ID,
        client_secret: process.env.GOOGLE_APP_SECRET,
        redirect_uri: `${process.env.API_URL}/oauth/google/code`
      })
      .then((res) => {
        debug('GET: /plus/v1/people/me/openIdConnect');
        return superagent.get('https://www.googleapis.com/plus/v1/people/me/openIdConnect')
          .set('Authorization', `Bearer ${res.body.access_token}`);
      })
      .then((res) => User.googleStrategy(res.body))
      .then((token) => {
        res.cookie('portfolio-login-token', token);
        res.redirect(`${process.env.CLIENT_URL}/settings`);
      })
      .catch((error) => {
        console.error(error);
        res.redirect(`${process.env.CLIENT_URL}/auth`);
      });
  }
});

authRouter.get('/oauth/facebook/code', (req, res) => {
  debug('GET: /oauth/facebook/code');

  if(!req.query.code){
    res.redirect(process.env.CLIENT_URL);
  }else{
    return superagent.get('https://graph.facebook.com/v3.2/oauth/access_token')
      .query({
        client_id: process.env.FACEBOOK_APP_ID,
        client_secret: process.env.FACEBOOK_APP_SECRET,
        redirect_uri: `${process.env.API_URL}/oauth/facebook/code`,
        code: req.query.code

      })
      .then((res) => {
        return superagent.get('https://graph.facebook.com/v3.2/me')
          .set('Authorization', `Bearer ${res.body.access_token}`)
          .set('content-type', 'text/javascript; charset=UTF-8')
          .query({fields: 'id,email'});
      })
      .then((res) => JSON.parse(res.text))
      .then((body) => User.facebookStrategy(body))
      .then((token) => {
        res.cookie('portfolio-login-token', token);
        res.redirect(`${process.env.CLIENT_URL}/settings`);
      });
  }
});

authRouter.get('/oauth/twitter/code', (req, res) => {
  debug('GET: /oauth/twitter/code');

  console.log(req);
  let authHeaders = {
    oauth_consumer_key: 'RHZ2wu6ItPCKzxLFngqKNfcpp',
    oauth_nonce: uuidv4(),
    oauth_timestamp: uuidv1()
  };

  superagent.post('https://api.twitter.com/oauth/request_token')
    .set({header: authHeaders})
    .query({
      x_auth_access_type: 'read',
      oauth_callback: 'http://localhost:8000/oauth/twitter/code'
    });

  if(!req.query.code){
    res.redirect(process.env.CLIENT_URL);
  }else{
    console.log(req)
  }
});

// authRouter.get('/auth/facebook', passport.authenticate('facebook'));
//
// authRouter.get('/auth/facebook/callback',
//   passport.authenticate('facebook', {failureRedirect: `${process.env.CLIENT_URL}/auth`}),
//   function(req, res){
//     debug('GET: /auth/facebook/callback');
//
//     res.cookie('portfolio-login-token', res.req.user);
//     res.redirect(`${process.env.CLIENT_URL}/settings`);
//   });

// authRouter.get('/auth/twitter',
//   passport.authenticate('twitter'));
//
// authRouter.get('/auth/twitter/callback',
//   passport.authenticate('twitter', {failureRedirect: `${process.env.CLIENT_URL}/auth`}),
//   function(req, res) {
//     debug('GET: /auth/twitter/callback');
//
//     res.cookie('portfolio-login-token', res.req.user);
//     res.redirect(`${process.env.CLIENT_URL}/settings`);
//   });
