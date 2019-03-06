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

postingSchema.methods.removeAllComments = function(id){
  debug('removeAllComments');

  
};

module.exports = mongoose.model('postings', postingSchema);
