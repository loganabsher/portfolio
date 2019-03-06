'use strict';

const debug = require('debug')('Backend-Portfolio:Comment.js');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Promise = require('bluebird');
const createError = require('http-errors');

const commentSchema = Schema({
  authorId: {type: String, required: true},
  text: {type: String, required: true},
  prev: {type: String, required: true},
  next: {type: Array, default: []},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
  delete: {type: Boolean, default: false}
});

// NOTE: need to add a method to connect comments and their parents

module.exports = mongoose.model('comments', commentSchema);
