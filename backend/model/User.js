'use strict';

const debug = require('debug')('Backend-Portfolio:User.js');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');
const crypto = require('crypto');
const createError = require('http-errors');
const jsonwebtoken = require('jsonwebtoken');
const Promise = require('bluebird');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const TwitterStrategy = require('passport-twitter');

const userSchema = Schema({
  profileId: String,
  googlePermissions: {
    authenticated: {type: Boolean, required: true},
    password: String
  },
  facebookPermissions: {
    authenticated: {type: Boolean, required: true},
    password: String
  },
  twitterPermissions: {
    authenticated: {type: Boolean, required: true},
    password: String
  },
  email: {type: String, required: true, unique: true},
  password: String,
  findHash: {type: String, unique: true}
});

userSchema.methods.generatePasswordHash = function(type, password){
  debug(`generatePasswordHash:${type}`);

  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if(err) return reject(err);
      switch(type){
      case 'normal':
        this.password = hash;
        resolve(this);
        break;
      case 'googlePermissions':
        this.googlePermissions.password = hash;
        resolve(this);
        break;
      case 'facebookPermissions':
        this.facebookPermissions.password = hash;
        resolve(this);
        break;
      case 'twitterPermissions':
        this.twitterPermissions.password = hash;
        resolve(this);
        break;
      default:
        return reject(createError(400, `unrecognized password type: ${type}`));
      }
    });
  });
};

userSchema.methods.comparePasswordHash = function(type, password){
  debug('comparePasswordHash');

  let user = this;
  return new Promise((resolve, reject) => {
    if(type === 'normal'){
      bcrypt.compare(password, user.password, (err, valid) => {
        if(err) return reject(err);
        if(!valid) return reject(createError(401, 'unauthorized'));
        resolve(user);
      });
    }else if(type === 'googlePermissions' || 'facebookPermissions' || 'twitterPermissions'){
      bcrypt.compare(password, user[type].password, (err, valid) => {
        if(err) return reject(err);
        if(!valid) return reject(createError(401, 'unauthorized'));
        resolve(user);
      });
    }else{
      reject(createError(400, `unrecognized password type: ${type}`));
    }
  });
};

userSchema.methods.generateFindHash = function(){
  debug('generateFindHash');

  return new Promise((resolve, reject) => {
    this.findHash = crypto.randomBytes(32).toString('hex');
    this.save()
      .then(() => resolve(this.findHash))
      .catch((err) => reject(err));
  });
};

userSchema.methods.generateToken = function(){
  debug('generateToken');

  return new Promise((resolve, reject) => {
    this.generateFindHash()
      .then((findHash) => resolve(jsonwebtoken.sign({token: findHash}, process.env.APP_SECRET)))
      .catch((err) => reject(err));
  });
};

const User = module.exports = mongoose.model('users', userSchema);

User.handleOauth = function(type, data){
  debug('handleOauth');

  return new Promise((resolve, reject) => {
    if(!type) reject(createError(400, `need to designate type parameter, ${type} is not valid`));
    if(!data || !data.email || !data.password) reject(createError(400, 'no data given'));
    return User.findOne({email: data.email})
      .then((user) => {
        if(user){
          if(user[type].authenticated){
            debug(`GET: /api/auth/${type}`);
            debug(`${type} user signin:`, data.email);
            return user.comparePasswordHash(type, data.password);
          }else{
            debug(`GET: /api/auth/${type}`);
            debug(`setting existing user with ${type}:`, data.email);
            user[type].authenticated = true;
            return user.generatePasswordHash(type, data.password);
          }
        }else{
          debug(`POST: /api/auth/${type}`);
          debug(`new user signup with ${type}:`, data.email);
          let newUser = new User({
            googlePermissions: {authenticated: false, password: null},
            facebookPermissions: {authenticated: false, password: null},
            twitterPermissions: {authenticated: false, password: null},
            email: data.email
          });
          newUser[type].authenticated = true;
          return newUser.generatePasswordHash(type, data.password);
        }
      })
      .then((user) => {
        return user.generateToken()
          .then((token) => {
            resolve({
              token: token,
              user: user
            });
          });
      })
      .catch((err) => reject(console.error(err)));
  });
};

User.googleStrategy = function(profile){
  debug('googleStrategy');

  let data = {email: profile.email, password: profile.sub};
  return User.handleOauth('googlePermissions', data);
};

passport.serializeUser((cookies, done) => done(null, cookies.user));
// NOTE: something is up with the desteralize user
passport.deserializeUser((cookies, done) => {
  console.log('desteralize', cookies)
  return done(null, cookies.user.user)
});

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: `${process.env.API_URL}/auth/facebook/callback`,
  profileFields: ['id', 'email']
},
function(accessToken, refreshToken, profile, done){
  debug('facebookStrategy');

  User.handleOauth('facebookPermissions', {email: profile.emails[0].value, password: profile.id})
    .then((cookies) => done(null, cookies));
}
));

passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_APP_ID,
  consumerSecret: process.env.TWITTER_APP_SECRET,
  userProfileURL: 'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true',
  callbackURL: `${process.env.API_URL}/auth/twitter/callback`,
},
function(token, tokenSecret, profile, done) {
  debug('twitterStrategy');

  User.handleOauth('twitterPermissions', {email: profile.emails[0].value, password: profile.id})
    .then((cookies) => done(null, cookies));
}
));
