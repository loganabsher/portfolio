'use strict';

const debug = require('debug')('Backend-Portfolio:User.js');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');
const crypto = require('crypto');
const createError = require('http-errors');
const jsonwebtoken = require('jsonwebtoken');
const Promise = require('bluebird');

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

module.exports = mongoose.model('users', userSchema);
