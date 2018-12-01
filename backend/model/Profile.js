'use strict';

const debug = require('debug')('Backend-Portfolio:Profile.js');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Promise = require('bluebird');
const createError = require('http-errors');

const User = require('./User.js');

const profileSchema = Schema({
  userId: String,
  firstName: String,
  lastName: String,
  userName: String
});

profileSchema.methods.connectProfileAndUser = function(userId){
  debug('connectProfileAndUser');

  let profile = this;
  return new Promise((resolve, reject) => {
    if(!userId) return reject(createError(400, 'missing userId'));
    // NOTE: not sure if adding the userId as a property for each profile is a good idea, I may remove it later
    User.findById(userId)
      .then((user) => {
        if(!user) return reject(createError(404, 'no user with this id was found'));
        if(user.profileId) reject(createError(500, 'a profile already exists for this user'));
        else{
          user.profileId = profile._id;
          user.save();
          profile.save();
          resolve(profile);
        }
      });
  });
};

module.exports = mongoose.model('profile', profileSchema);
