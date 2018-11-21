'use strict';

const debug = require('debug')('Backend-Portfolio:Comment.js');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = Schema({
  authorId: {type: String, required: true},
  messageId: {type: String, required: true},
  text: String,
});

module.exports = mongoose.model('comments', commentSchema);
