'use strict';

const debug = require('debug')('Backend-Portfolio:User.js');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');
const crypto = require('crypto');
const createError = require('http-errors');
const jsonwebtoken = require('jsonwebtoken');
const Promise = require('bluebird');

const Message = require('./Message.js');

const userSchema = Schema({
  profileId: String,
  googlePermissions: {
    authenticated: {type: Boolean, default: false},
    password: {type: String, default: null}
  },
  facebookPermissions: {
    authenticated: {type: Boolean, default: false},
    password: {type: String, default: null}
  },
  twitterPermissions: {
    authenticated: {type: Boolean, default: false},
    password: {type: String, default: null}
  },
  email: {type: String, required: true, unique: true},
  authenticated: {type: Boolean, default: false},
  password: {type: String, default: null},
  findHash: {type: String, unique: true}
});

userSchema.methods.generatePasswordHash = function(type, password){
  debug(`generatePasswordHash:${type}`);

  return new Promise((resolve, reject) => {
    if(!password) reject(createError(400, 'bad request: no password was provided'));

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
        return reject(createError(400, `bad request: unrecognized password type for user schema: ${type}`));
      }
    });
  });
};

userSchema.methods.comparePasswordHash = function(type, password){
  debug('comparePasswordHash');

  let user = this;
  return new Promise((resolve, reject) => {
    if(!password) reject(createError(400, 'bad request: no password was provided'));

    if(type === 'normal'){
      bcrypt.compare(password, user.password, (err, valid) => {
        if(err) reject(err);
        if(!valid) reject(createError(401, 'unauthorized'));
        resolve(user);
      });
    }else if(type === 'googlePermissions' || 'facebookPermissions' || 'twitterPermissions'){
      bcrypt.compare(password, user[type].password, (err, valid) => {
        if(err) reject(err);
        if(!valid) reject(createError(401, 'unauthorized'));
        resolve(user);
      });
    }else{
      reject(createError(400, `bad request: unrecognized password type for user schema: ${type}`));
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

userSchema.methods.handleUserDelete = function(){
  debug('handleUserDelete');

  let user = this;
  return new Promise((resolve, reject) => {
    Message.find({'authorId': user._id})
      .then((messages) => {
        if(!messages) resolve(this);
        messages.map((ele) => ele.handleDelete());
      })
      .then(() => Message.deleteMany({'authorId': user._id}))
      .then(() => resolve(user))
      .catch((err) => reject(err));

  });
};

const User = module.exports = mongoose.model('users', userSchema);

User.handleOauth = function(type, data){
  debug('handleOauth');

  return new Promise((resolve, reject) => {
    if(!type) reject(createError(400, `bad request : need to designate type parameter, ${type} is not valid`));
    if(!data || !data.email || !data.password) reject(createError(400, 'no data given'));

    return User.findOne({'email': data.email})
      .then((user) => {
        if(user){
          debug(`GET: /api/auth/${type}`);
          if(user[type].authenticated){
            debug(`returning ${type} user signin:`, data.email);
            return user.comparePasswordHash(type, data.password);
          }else{
            debug(`setting existing user with ${type}:`, data.email);
            user[type].authenticated = true;
            return user.generatePasswordHash(type, data.password);
          }
        }else{
          debug(`POST: /api/auth/${type}`);
          debug(`new user signup with ${type}:`, data.email);

          let newUser = new User({email: data.email});
          newUser[type].authenticated = true;
          return newUser.generatePasswordHash(type, data.password);
        }
      })
      .then((user) => user.generateToken())
      .then((token) => resolve(token))
      .catch((err) => reject(console.error(err)));
  });
};

User.googleStrategy = function(profile){
  debug('googleStrategy');

  let data = {email: profile.email, password: profile.sub};
  return User.handleOauth('googlePermissions', data);
};

User.facebookStrategy = function(profile){
  debug('facebookStrategy');

  let data = {email: profile.email, password: profile.id};
  return User.handleOauth('facebookPermissions', data);
};

// NOTE: still struggling to get twitter oauth working properly but the other two work fine
User.twitterPermissions = function(profile){
  debug('twitterStrategy');

  console.log(profile);
  let data = {email: profile.email, password: profile.id};
  return User.handleOauth('twitterPermissions', data);
};
