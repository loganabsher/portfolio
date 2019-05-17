'use strict';

const debug = require('debug')('Backend-Portfolio:Article.js');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = Schema({
  author_id: {type: String, required: true},
  title: {type: String, required: true},
  text: {type: String, required: true},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('articles', articleSchema);
