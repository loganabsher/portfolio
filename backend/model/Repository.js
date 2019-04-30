'use strict';

const debug = require('debug')('Backend-Portfolio:Repository.js');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const repoSchema = Schema({
  name: String,
  language: String,
  forks: Number,
  watchers: Number,
  size: Number,
  created_at: String,
  updated_at: String,
  branches_url: String
});

module.exports = mongoose.model('repositories', repoSchema);
