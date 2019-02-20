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
  prev: {type: Object, default: null},
  comments: {type: Array, default: []}
});

messageSchema.methods.addComment = function(node){
  debug('addComment');

  return new Promise((resolve, reject) => {
    if(!node || !node.authorId || !node.text) reject(createError(400, 'invalid node:', node));
    if(!this || !this.authorId || !this.text) reject(createError(400, 'invalid node invokation:', this));

    this.comments.push(node);
    node.prev = this;
    resolve(this);
  });
};
