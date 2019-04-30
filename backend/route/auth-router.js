'use strict';

const debug = require('debug')('Backend-Portfolio:auth-router.js');

const Router = require('express').Router;
const superagent = require('superagent');
const createError = require('http-errors');
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
      .then((res) => {
        if(res.text){
          return JSON.parse(res.text)
        }else{
          return createError(400, 'bad request: no data was returned from facebook\'s oauth')
        }
      })
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
  // let oauth = new OAuth.OAuth(
  //   oauth_consumer_key: 'RHZ2wu6ItPCKzxLFngqKNfcpp',
  //   oauth_nonce: uuidv4(),
  //   oauth_timestamp: uuidv1()
  // );
  const authHeader = {
    oauth_callback: 'http://localhost:8000/oauth/twitter/code',
    oauth_consumer_key: process.env.TWITTER_APP_ID,
    oauth_consumer_secret: process.env.TWITTER_APP_SECRET
  };

  superagent.post('https://api.twitter.com/oauth/request_token')
    .set({'Authorization': `OAuth oauth_consumer_key="${process.env.TWITTER_APP_ID}",
oauth_consumer_secret="${process.env.TWITTER_APP_SECRET}",
oauth_nonce="${uuidv4()}",
oauth_callback="http://localhost:8000/oauth/twitter/code"`
    })
    .then((res) => {
      console.log(res)
    })

  if(!req.query.code){
    res.redirect(process.env.CLIENT_URL);
  }else{
    console.log(req)
  }
});
