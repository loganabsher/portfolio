'use strict';

const debug = require('debug')('Backend-Portfolio:Comment.js');

const createError = require('http-errors');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = Schema({
  authorId: {type: String, required: true},
  messageId: {type: String, required: true},
  value: {type: String, required: true},
  prev: {type: Object, default: null},
  next: {type: Object, default: null}
});

// NOTE: thinking about trying to make this into a linked list, not sure how the
// best way to proceed would be.

commentSchema.methods.addItem = function(node){
  debug('addItem');

  if(this.next){
    this.next.addItem(node);
  }else{
    this.next = node;
    node.prev = this;
    return;
  }
};

commentSchema.methods.removeItem = function(node){
  debug('removeItem');

  if(this === node){
    this.next = node.next;
    node.next.prev = this;
    return;
  }else if(!this.next){
    return createError(404, `no item found in this comment chain for ${node}`);
  }else{
    this.next.removeItem(node);
    return;
  }
};

module.exports = mongoose.model('comments', commentSchema);
