'use strict';

const debug = require('debug')('Backend-Portfolio:Message.js');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Promise = require('bluebird');

const messageSchema = Schema({
  authorId: {type: String, required: true},
  title: String,
  text: String,
  photos: String,
  comments: String
});

messageSchema.methods.addComment = function(comment){
  debug('addComment');

  return new Promise((resolve, reject) => {
      
  });
};

module.exports = mongoose.model('messages', messageSchema);
