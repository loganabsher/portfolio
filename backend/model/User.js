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
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  findHash: {type: String, unique: true}
});

userSchema.methods.generatePasswordHash = function (password) {
  debug('generatePasswordHash');

  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if(err) return reject(err);
      this.password = hash;
      resolve(this);
    });
  });
};

userSchema.methods.comparePasswordHash = function(password){
  debug('comparePasswordHash');

  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, valid) => {
      if (err) return reject(err);
      if (!valid) return reject(createError(401, 'unauthorized'));
      resolve(this);
    });
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

User.handleOAUTH = function(data) {
  debug('googleOauth');

  if(!data || !data.email) return Promise.reject(createError(400, 'VALIDATION ERROR - missing login info'));

  return User.findOne({email: data.email})
    .then((user) => {
      if(!user) {
        throw new Error('not found - create a user');
      }
      return user;
    })
    .catch(() => {
      console.log('___DATA___', data);
      return new User({email: data.email, password: data.sub}).save();
    });
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: `${process.env.API_URL}/auth/facebook/callback`,
  profileFields: ['id', 'email']
},
function(accessToken, refreshToken, profile, cb){
  User.findOneAndUpdate({email: profile.emails[0].value}, {$setOnInsert: {email: profile.emails[0].value, password: profile.id}},
    {
      returnOriginal: false,
      upsert: true
    },
    function(err, user) {
      return cb(err, user);
    }
  );
}
));

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_APP_ID,
    consumerSecret: process.env.TWITTER_APP_SECRET,
    callbackURL: `${process.env.API_URL}/auth/twitter/callback`
  },
  function(token, tokenSecret, profile, cb) {
    User.findOneAndUpdate({email: profile.username}, {$setOnInsert: {email: profile.username, password: profile.id}},
      {
        returnOriginal: false,
        upsert: true
      },
      function (err, user) {
        return cb(err, user);
    });
  }
));
