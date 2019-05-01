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
  inactive: {
    delete: {type: Boolean, default: false},
    delete_by: {type: String}
  }
});

commentSchema.methods.addNext = function(parent){
  debug('addNext');

  let comment = this;
  return new Promise((resolve, reject) => {
    if(!parent || !parent.next) return reject(createError(400, 'bad request: the post provided was invalid -', parent));
    if(!comment || !comment._id) return reject(createError(400, 'bad request: the comment that was provided was invalid -', comment));
    parent.next.push(comment._id);
    parent.save();
    resolve(comment);
  });
};

commentSchema.methods.deleteCommentChain = function(){
  debug('deleteCommentChain');

  let comment = this;
  return new Promise((resolve, reject) => {
    if(!comment) return reject(createError(400, 'bad request: no comment was provided -', comment));
    if(comment.next > 0){
      comment.next.map((ele) => {
        ele.deleteCommentChain();
      });
    }
    console.log(this);
    this.delete({_id: this._id});
    console.log('after', this);
    resolve();
  });
};

module.exports = mongoose.model('comments', commentSchema);
