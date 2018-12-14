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
      console.log('normal')
      console.log(user.password)
      console.log(password)
      bcrypt.compare(password, user.password, (err, valid) => {
        if(err) return reject(err);
        if(!valid) return reject(createError(401, 'unauthorized'));
        resolve(user);
      });
    }else if(type === 'googlePermissions' || 'facebookPermissions' || 'twitterPermissions'){
      console.log(type)
      console.log(user[type].password)
      console.log(password)
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
      .then((findHash) => {
        console.log(findHash)
        resolve(jsonwebtoken.sign({token: findHash}, process.env.APP_SECRET))
      })
      .catch((err) => reject(err));
  });
};

const User = module.exports = mongoose.model('users', userSchema);

User.handleOAUTH = function(data){
  debug('googleOauth');

  if(!data || !data.email) return Promise.reject(createError(400, 'VALIDATION ERROR - missing login info'));

  return User.findOne({email: data.email})
    .then((user) => {
      if(user){
        if(user.googlePermissions.authenticated){
          debug('GET: /api/auth/google');
          debug('returning google user signin:', data.email);
          user.comparePasswordHash('googlePermissions', data.sub)
            .then((user) => user.generateToken())
            .then((token) => res.send({user: user, token: token}))
            .catch((err) => console.error(err));
        }else{
          user.generatePasswordHash('googlePermissions', data.sub)
            .then((user) => user.generateToken())
            .catch((err) => console.error(err));
          user.googlePermissions.authenticated = true;
          user.save();
          debug('GET: /api/auth/google');
          debug('setting existing user with google permissions:', data.email);
        }
        return user;
      }else{
        debug('POST: /api/auth/google');
        let newUser = new User({
          googlePermissions: {authenticated: false, password: null},
          facebookPermissions: {authenticated: false, password: null},
          twitterPermissions: {authenticated: false, password: null},
          email: data.email
        });
        newUser.generatePasswordHash('googlePermissions', data.sub)
          .then((user) => user.generateToken())
          .catch((err) => console.error(err));
        newUser.googlePermissions.authenticated = true;
        newUser.save();
        debug('new google user signup:', data.email);
        return newUser;
      }
    });
};

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => done(null, id));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: `${process.env.API_URL}/auth/facebook/callback`,
  profileFields: ['id', 'email']
},
function(accessToken, refreshToken, profile, done){
  User.findOne({email: profile.emails[0].value})
    .then((user) => {
      if(user){
        // NOTE: should add some sort of try catch here just in case something changes from facebook or twitter
        if(user.facebookPermissions.authenticated){
          debug('GET: /api/auth/facebook');
          debug('returning facebook user signin:', profile.emails[0].value);
          user.comparePasswordHash('facebookPermissions', profile.id)
            .then((user) => user.generateToken())
            .catch((err) => console.error(err));
        }else{
          debug('PUT: /api/auth/facebook');
          debug('setting existing user with facebook permissions:', profile.emails[0].value);
          user.facebookPermissions.password = user.generatePasswordHash('facebookPermissions', profile.id)
            .then((user) => user.generateToken())
            .catch((err) => console.error(err));
          user.facebookPermissions.authenticated = true;
          user.save();
        }
        return done(null, user);
      }else{
        debug('POST: /api/auth/facebook');
        let newUser = new User({
          googlePermissions: {authenticated: false, password: null},
          facebookPermissions: {authenticated: true, password: null},
          twitterPermissions: {authenticated: false, password: null},
          email: profile.emails[0].value,
        });
        newUser.generatePasswordHash('facebookPermissions', profile.id)
          .then((user) => user.generateToken())
          .catch((err) => console.error(err));
        newUser.facebookPermissions.authenticated = true;
        newUser.save();
        debug('new facebook user signup:', profile.emails[0].value);
        return done(null, newUser);
      }
    });
}
));

// NOTE: okay I just made a request for a user's email from twitter, just need to wait a little
passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_APP_ID,
  consumerSecret: process.env.TWITTER_APP_SECRET,
  callbackURL: `${process.env.API_URL}/auth/twitter/callback`
},
function(token, tokenSecret, profile, done) {
  console.log(profile);
  User.findOne({email: profile.username})
    .then((user) => {
      if(user){
        if(user.twitterPermissions.authenticated){
          debug('GET: /api/auth/twitter');
          debug('returning twitter user signin:', profile.username);
          user.comparePasswordHash('twitterPermissions', profile.id)
            .then((user) => user.generateToken())
            .catch((err) => console.error(err));
        }else{
          debug('PUT: /api/auth/twitter');
          debug('setting existing user with twitter permissions:', profile.username);
          user.twitterPermissions.password = user.comparePasswordHash('twitterPermissions', profile.id)
            .then((user) => user.generateToken())
            .catch((err) => console.error(err));
          user.twitterPermissions.authenticated = true;
          user.save();
        }
        return done(null, user);
      }else{
        debug('POST: /api/auth/twitter');
        let newUser = new User({
          googlePermissions: {authenticated: false, password: null},
          facebookPermissions: {authenticated: false, password: null},
          twitterPermissions: {authenticated: true, password: null},
          email: profile.username
        });
        newUser.generatePasswordHash('twitterPermissions', profile.id)
          .then((user) => user.generateToken())
          .catch((err) => console.error(err));
        newUser.twitterPermissions.authenticated = true;
        newUser.save();
        debug('new twitter user signup:', profile.username);
        return done(null, newUser);
      }
    });
}
));
