'use strict';

const debug = require('debug')('Backend-Portfolio:auth-router.js');

const Router = require('express').Router;
const Promise = require('bluebird');
const superagent = require('superagent');
const passport = require('passport');

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
      .then((data) => {
        res.cookie('portfolio-login-token', data.token);
        res.cookie('user', `${data.user._id}`);
        res.redirect(`${process.env.CLIENT_URL}/settings`);
      })
      .catch((error) => {
        console.error(error);
        res.redirect(`${process.env.CLIENT_URL}/auth`);
      });
  }
});

authRouter.get('/auth/facebook', passport.authenticate('facebook'));

authRouter.get('/auth/facebook/callback',
  passport.authenticate('facebook', {failureRedirect: `${process.env.CLIENT_URL}/auth`}),
  function(req, res){
    console.log(res.req)
    console.log(res.req.user.user._id)
    res.cookie('portfolio-login-token', res.req.user.token);
    // NOTE: this is so fucking stupid but its the only way I've gotten it to work
    res.cookie('user', `${res.req.user.user._id}`);
    res.redirect(`${process.env.CLIENT_URL}/settings`);
  });

authRouter.get('/auth/twitter',
  passport.authenticate('twitter'));

authRouter.get('/auth/twitter/callback',
  passport.authenticate('twitter', {failureRedirect: `${process.env.CLIENT_URL}/auth`}),
  function(req, res) {
    console.log(res.req)
    res.cookie('portfolio-login-token', res.req.user.token);
    res.cookie('user', `${res.req.user.user._id}`);
    res.redirect(`${process.env.CLIENT_URL}/settings`);
  });
