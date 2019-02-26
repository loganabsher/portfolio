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
    console.log(node)
    console.log(this)
    if(!node || !node.authorId || node.prev) return reject(createError(400, 'invalid node:', node));
    if(!this || !this.authorId || !this.comments) return reject(createError(400, 'invalid node invokation:', this));

    this.comments.push(node);
    node.prev = this._id;
    this.save();
    node.save();
    resolve(this);
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
