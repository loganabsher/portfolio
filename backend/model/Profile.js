'use strict';

const debug = require('debug')('Backend-Portfolio:Profile.js');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Promise = require('bluebird');
const createError = require('http-errors');

const User = require('./User.js');

const profileSchema = Schema({
  first_name: String,
  last_name: String,
  user_name: String
});

profileSchema.methods.connectProfileAndUser = function(user_id){
  debug('connectProfileAndUser');

  let profile = this;
  return new Promise((resolve, reject) => {
    if(!user_id) return reject(createError(400, 'bad request: missing user_id parameter'));
    User.findById({'_id': user_id})
      .then((user) => {
        if(!user) return reject(createError(404, 'no user with this id was found'));
        if(user.profile_id) return reject(createError(500, 'a profile already exists for this user'));
        else{
          user.profile_id = profile._id;
          user.save();
          profile.save();
          resolve(profile);
        }
      });
  });
};

profileSchema.methods.disconnectProfileAndUser = function(user_id){
  debug('disconnectProfileAndUser');

  let profile = this;
  return new Promise((resolve, reject) => {
    if(!user_id) return reject(createError(400, 'missing user_id'));
    User.findById({'_id': user_id})
      .then((user) => {
        if(!user) return reject(createError(404, 'no user with this id was found'));
        if(user.profile_id){
          user.set('profile_id', null);
          user.save();
          resolve(profile);
        }
        resolve(profile);
      });
  });
};

module.exports = mongoose.model('profile', profileSchema);
