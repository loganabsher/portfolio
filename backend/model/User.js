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

  return new Promise((resolve, reject) => {
    if(type === 'normal'){
      console.log('normal')
      console.log(this.password)
      console.log(password)
      bcrypt.compare(password, this.password, (err, valid) => {
        if(err) return reject(err);
        if(!valid) return reject(createError(401, 'unauthorized'));
        resolve(this);
      });
    }else if(type === 'googlePermissions' || 'facebookPermissions' || 'twitterPermissions'){
      console.log(type)
      console.log(this[type].password)
      console.log(password)
      bcrypt.compare(password, this[type].password, (err, valid) => {
        if(err) return reject(err);
        if(!valid) return reject(createError(401, 'unauthorized'));
        resolve(this);
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
            .catch((err) => console.error(err));
        }else{
          user.googlePermissions.password = user.generatePasswordHash('googlePermissions', data.sub)
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
        debug('new google user signup:', data.email);
        let newUser = new User({
          googlePermissions: {authenticated: false, password: null},
          facebookPermissions: {authenticated: false, login: null},
          twitterPermissions: {authenticated: false, login: null},
          email: data.email
        });
        newUser.generatePasswordHash('googlePermissions', data.sub)
          .then((user) => user.generateToken())
          .catch((err) => console.error(err));
        newUser.googlePermissions.authenticated = true;
        newUser.save();
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
        debug('new facebook user signup:', profile.emails[0].value);
        let newUser = new User({
          googlePermissions: {authenticated: false, login: null},
          facebookPermissions: {authenticated: true, login: profile.id},
          twitterPermissions: {authenticated: false, login: null},
          email: profile.emails[0].value,
        });
        newUser.generatePasswordHash('facebookPermissions', profile.id)
          .then((user) => user.generateToken())
          .catch((err) => console.error(err));
        newUser.facebookPermissions.authenticated = true;
        newUser.save();
        return done(null, newUser);
      }
    });
}
));

passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_APP_ID,
  consumerSecret: process.env.TWITTER_APP_SECRET,
  callbackURL: `${process.env.API_URL}/auth/twitter/callback`
},
function(token, tokenSecret, profile, done) {
  // NOTE: I don't have advanced permissions to request a user's email... as of now...
  User.findOne({email: profile.username})
    .then((user) => {
      if(user){
        if(user.twitterPermissions.authenticated){
          debug('GET: /api/auth/twitter');
          debug('returning twitter user signin:', profile.username);
        }else{
          debug('PUT: /api/auth/twitter');
          debug('setting existing user with twitter permissions:', profile.username);
          user.twitterPermissions.login = profile.id;
          user.twitterPermissions.authenticated = true;
          user.save();
        }
        return done(null, user);
      }else{
        debug('POST: /api/auth/twitter');
        let newUser = new User({
          googlePermissions: {authenticated: false, login: null},
          facebookPermissions: {authenticated: false, login: null},
          twitterPermissions: {authenticated: true, login: profile.id},
          email: profile.username
        });
          // .generatePasswordHash(profile.id)
          // .then((user) => {
        // user.generateToken();
        debug('new twitter user signup:', profile.username);
        return done(null, newUser);
      // });
      }
    });
}
));
