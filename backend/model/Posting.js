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

postingSchema.methods.deleteAllChildren = function(){
  debug('deleteAllChildren');

  // NOTE: should probably break these up into two different methods, but it works for now
  const deleteLoop = function(node){
    Comment.findById({'_id': node._id})
      .then((post) => {
        if(post.next.length > 0){
          post.next.map((ele) => {
            deleteLoop(ele);
          });
        }else{
          // NOTE: maybe try deleteSelf and see how that works with deleting the comment chain
          debug('deleting comment: ', post);
          Comment.deleteOne({'_id': post._id})
            .catch((err) => createError(500, 'failed to delete', post, err));
        }
      })
      .catch((err) => createError(400, 'bad request: ', node, err));
  };

  let post = this;
  return new Promise((resolve, reject) => {
    if(post.next.length < 1) reject(createError(400, 'bad request: this method should not be called if the post has no next', post, post.next));
    Comment.find({'prev': post._id})
      .then((postings) => {
        if(!postings) reject(createError(409, 'database error: the items in the database do not match the item requested for deletion', post.next, postings));
        postings.map((ele) => {
          deleteLoop(ele)
            .then(() => resolve(post));
        });
      })
      .catch((err) => reject(createError(500, 'failed to delete', err)));
  });
};

module.exports = mongoose.model('postings', postingSchema);
