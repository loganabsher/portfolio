'use strict';

const debug = require('debug')('Backend-Portfolio:Message.js');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Promise = require('bluebird');
const createError = require('http-errors');

const messageSchema = Schema({
  authorId: {type: String, required: true},
  title: String,
  text: String,
  photos: Array,
  comments: Array
});

messageSchema.methods.addComment = function(comment){
  debug('addComment');

  return new Promise((resolve, reject) => {
    if(!comment) reject(createError(400, 'no comment provided'));
    if(typeof this.comments !== 'object') this.comments = [];
    this.comments.push(comment);
    this.save()
      .then(() => resolve(comment))
      .catch((err) => reject(err));
  });
};

module.exports = mongoose.model('messages', messageSchema);
