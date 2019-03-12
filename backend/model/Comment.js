'use strict';

const debug = require('debug')('Backend-Portfolio:Comment.js');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Promise = require('bluebird');
const createError = require('http-errors');

const commentSchema = Schema({
  authorId: {type: String, required: true},
  text: {type: String, required: true},
  prev: {type: String, required: true},
  next: {type: Array, default: []},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
  delete: {type: Boolean, default: false}
});

commentSchema.methods.addNext = function(posting){
  debug('addNext');

  let comment = this;
  return new Promise((resolve, reject) => {
    if(!posting || !posting.next) return reject(createError(400, 'bad request: the post provided was invalid', posting));
    if(!comment || !comment._id) return reject(createError(400, 'bad request: the comment that was provided was invalid: ', comment));
    posting.next.push(comment._id);
    posting.save();
    resolve(comment);
  });
};

module.exports = mongoose.model('comments', commentSchema);
