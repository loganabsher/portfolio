// 'use strict';
//
// const debug = require('debug')('Backend-Portfolio:Message.js');
//
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
//
// const Promise = require('bluebird');
// const createError = require('http-errors');
//
// const Comment = require('../model/Comment.js');
//
// const messageSchema = Schema({
//   authorId: {type: String, required: true},
//   title: String,
//   text: String,
//   photos: Array,
//   comments: Array
// });
//
// // NOTE: I'm thinking maybe I should rewrite both the messages and comments as one
// // thing, having the "message" aspect of it just being the root of a larger data
// // structure, they are both fairly similar anyways and I am a little afraid of making
// // things overly complicated.
//
// messageSchema.methods.addComment = function(comment){
//   debug('addComment');
//
//   return new Promise((resolve, reject) => {
//     if(!comment) reject(createError(400, 'no comment provided'));
//     if(typeof this.comments !== 'object') this.comments = [];
//
//     this.comments.push(comment);
//     this.save()
//       .then((message) => resolve(message.comments))
//       .catch((err) => reject(err));
//   });
// };
//
// messageSchema.methods.updateComment = function(comment){
//   debug('updateComment');
//
//   return new Promise((resolve, reject) => {
//     if(!comment) reject(createError(400, 'no comment provided'));
//     if(this.comments.length < 1) reject(500, 'no reference found');
//     this.comments.map((ele) => {
//       console.log(ele._id);
//       console.log(comment._id);
//       if(ele._id === comment._id) ele.text = comment.text;
//     });
//     this.save()
//       .then((message) => resolve(message.comments))
//       .catch((err) => reject(err));
//   });
// };
//
// messageSchema.methods.deleteComment = function(comment){
//   debug('deleteComent');
//
//   return new Promise((resolve, reject) => {
//     let message = this;
//
//     if(!comment._id) reject(createError(400, 'need to provide a comment object with a valid existing comment._id parameter'));
//     if(this.comments.length < 1) reject(500, 'no reference found');
//     this.comments.filter((ele) => ele._id === comment._id);
//     message.save()
//       .then((message) => resolve(message.comments))
//       .catch((err) => reject(err));
//   });
// };
//
// messageSchema.methods.deleteAllComments = function(){
//   debug('deleteAllComments');
//
//   return new Promise((resolve, reject) => {
//     let message = this;
//
//     if(!this || !this._id || !this.comments) reject(createError(500, 'invalid message perameters', this));
//
//   })
// }
//
// module.exports = mongoose.model('messages', messageSchema);

'use strict';

const debug = require('debug')('Backend-Portfolio:Message.js');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Promise = require('bluebird');
const createError = require('http-errors');

const messageSchema = Schema({
  authorId: {type: String, required: true},
  title: {type: String, required: false},
  text: {type: String, required: false},
  photos: {type: Array, default: []},
  prev: {type: String, default: null},
  comments: {type: Array, default: []},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
  delete: {type: String, default: null}
});

messageSchema.methods.addComment = function(node){
  debug('addComment');

  return new Promise((resolve, reject) => {
    // NOTE: these error catches are pretty bad, I need to break them up a little more I think.
    if(!node || !node.authorId || !node.prev || (!node.text && !node.title)) return reject(createError(400, 'invalid node:', node));
    if(!this || !this.authorId || !this.comments || (!node.text && !node.title)) return reject(createError(400, 'invalid node invokation:', this));

    this.comments.push(node);
    node.prev = this._id;
    this.save();
    node.save();
    resolve(node);
  });
};

// NOTE: needs work
messageSchema.methods.addPhoto = function(photo){
  debug('addComment');

  return new Promise((resolve, reject) => {
    // NOTE: I need to set up AWS for image hosting.
    resolve(photo);
  })
};

messageSchema.methods.removeComment = function(node){
  debug('removeComment');

  return new Promise((resolve, reject) => {


  })
};

messageSchema.methods.deleteAllComments = function(){
  debug('deleteAllComments');

  return new Promise((resolve, reject) => {


  })
};

module.exports = mongoose.model('messages', messageSchema);
