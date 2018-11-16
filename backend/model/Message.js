'use strict';

const debug = require('debug')('Backend-Portfolio:Message.js');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = Schema({
  authorId: {type: String, required: true},
  title: String,
  text: String,
  photos: String,
  comments: String
});

module.exports = mongoose.model('messages', messageSchema);