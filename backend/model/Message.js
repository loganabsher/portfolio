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
  delete: {type: Boolean, default: false}
});

messageSchema.methods.addComment = function(node){
  debug('addComment');

  return new Promise((resolve, reject) => {
    // NOTE: these error catches are pretty bad, I need to break them up a little more I think.
    if(!node || !node.authorId || this.prev) return reject(createError(400, 'invalid node:', node));
    if(!this || !this.authorId || !this.comments) return reject(createError(400, 'invalid node invokation:', this));

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

const Message = module.exports = mongoose.model('messages', messageSchema);

Message.removeComment = function(){
  debug('removeComment');

  return new Promise((resolve, reject) => {
    if(!this || !this.authorId) return reject(createError(400, 'bad request: invalid invokation of node:', this));

    this.delete = true;
    this.save();
    resolve(this);
  });
};

Message.handleEdit = function(){
  debug('handleEdit');

  return new Promise((resolve, reject) => {
    if(!this.prev) return reject(createError(400, 'there is no previous comment to edit:', this));

    let message = this;
    Message.findById({'_id': this.prev})
      .then((parent) => {
        return parent.map((node) => {
          return node._id != message._id;
        });
      })
      .then((parent) => {
        parent.save();
        resolve(parent);
      })
      .catch((err) => reject(err));
  });
};

Message.deleteSelf = function(){
  debug('deleteSelf');

  return new Promise((resolve, reject) => {
    if(!this || !this.authorId) return reject(createError(400, 'bad request: invalid invokation of node:', this));
    if(this.comments > 0) return reject(createError(500, 'server error: this method is for permenantly deleting nodes, this node has comments attached to it, please use removeComment instead:', this, this.comments));

    let message = this;
    if(this.prev){
      Message.findById({'_id': this.prev})
        .then((parent) => {
          if(!parent || !parent.comments > 0) reject(createError(500, 'server error: parent node does not match child node', parent, message));
          return parent.comments.filter((node) => {
            return node._id != message._id;
          });
        })
        .then((parent) => {
          parent.save()
            .then(() => {
              Message.deleteOne({'_id': this._id})
                .then(() => resolve())
                .catch((err) => reject(err));
            })
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    }else{
      Message.deleteOne({'_id': this._id})
        .then(() => resolve())
        .catch((err) => reject(err));
    }
  });
};

Message.deleteSelfAndAllComments = function(){
  debug('deleteSelfAndAllComments');

  return new Promise((resolve, reject) => {
    if(!this || !this.authorId) return reject(createError(400, 'bad request: invalid invokation of node:', this));
    if(this.prev) return reject(createError(500, 'server error: this is not the root node:', this, this.prev));

    if(this.comments > 0){
      this.comments.map((node) => {
        if(node.comments > 0){
          node.deleteSelfAndAllComments();
        }else{
          Message.deleteOne({'_id': node._id});
        }
      });
    }else{
      reject(createError(500, 'server error: this method should not be called on elements that do not have comments:', this, this.comments));
    }
    resolve();
  });
};
