'use strict';

const debug = require('debug')('Backend-Portfolio:Message.js');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Promise = require('bluebird');
const createError = require('http-errors');

const messageSchema = Schema({
  author_id: {type: String, required: true},
  title: {type: String, required: true},
  text: {type: String, defualt: null},
  photos: {type: Array, default: []},
  next: {type: Array, default: []},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
  inactive: {
    delete_at: {type: String, default: null},
    delete_by: {type: String, default: null}
  }});

messageSchema.methods.handleDelete = function(){
  debug('handleDelete');

  let message = this;
  return new Promise((resolve, reject) => {
    if(!message) return reject(createError(400, 'bad request: no message was provided -', message));
    if(message.next) message.next.map((ele) => ele.deleteAllChildren());
    resolve();
  });
};

module.exports = mongoose.model('messages', messageSchema);
