'use strict';

const debug = require('debug')('Backend-Portfolio:Posting.js');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Promise = require('bluebird');
const createError = require('http-errors');

const Comment = require('./Comment.js');

const postingSchema = Schema({
  authorId: {type: String, required: true},
  title: {type: String, required: true},
  text: {type: String, defualt: null},
  photos: {type: Array, default: []},
  next: {type: Array, default: []},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
  delete: {type: Boolean, default: false}
});

postingSchema.methods.addComment = function(commentId){
  debug('addComment');

  let post = this;
  return new Promise((resolve, reject) => {
    if(!commentId) return reject(createError(400, 'bad request: no id feild was provided', commentId));

    Comment.findById({'_id': commentId})
      .then((comment) => {
        if(!comment) return reject(createError(404, 'not found: this comment doesnt exist', commentId, comment));

        // NOTE: this should maybe be a method chain
        comment.prev = post._id;
        comment.save();
        post.next.push(commentId);
        post.save();
        resolve(post);
      });
  });
};

// NOTE: this should probably be in the comment.js model
// postingSchema.methods.removeComment = function(commentId){
//   debug('removeComment');
//
// };

postingSchema.methods.removeAllComments = function(id){
  debug('removeAllComments');


};

module.exports = mongoose.model('postings', postingSchema);
