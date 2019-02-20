// 'use strict';
//
// const debug = require('debug')('Backend-Portfolio:Comment.js');
//
// const createError = require('http-errors');
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const Promise = require('bluebird');
//
// const commentSchema = Schema({
//   authorId: {type: String, required: true},
//   messageId: {type: String, required: true},
//   text: {type: String, required: true},
//   prev: {type: Object, default: null},
//   next: {type: Array, default: []}
// });
//
// commentSchema.methods.addRely = function(node){
//   debug('addReply', node.authorId);
//
//   return new Promise((resolve, reject) => {
//     if(!node || !node.authorId || !node.messageId || !node.text) reject(createError(400, 'invalid node:', node));
//     if(!this || !this.authorId || !this.messageId || !this.text) reject(createError(400, 'invalid node invokation:', this));
//
//     this.next.push(node);
//     node.prev = this._id;
//     resolve(this);
//   });
// };
//
// commentSchema.methods.removeItem = function(node){
//   debug('removeItem');
//
//   return new Promise((relove, reject) => {
//     if(!node || !node.authorId || !node.messageId || !node.text || !node.prev) reject(createError(400, 'invalid node:', node));
//     if(!this || !this.authorId || !this.messageId || !this.text || !this.next[node]) reject(createError(400, 'invalid node invokation:', this));
//
//     // NOTE: I am thinking this may be abusable if I acutally remove these nodes and reasign comments to
//     // the parent node, I may just change the text to something like "[removed]" and remove the author id
//     // however that is going to take a lot of work and add a few exceptions.
//
//     // if(node.)
//   });
//
//   if(this === node){
//     this.next = node.next;
//     node.next.prev = this;
//     return;
//   }else if(!this.next){
//     return createError(404, `no item found in this comment chain for ${node}`);
//   }else{
//     this.next.removeItem(node);
//     return;
//   }
// };
//
// module.exports = mongoose.model('comments', commentSchema);
