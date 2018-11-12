'use strict';

// NOTE: perhaps change this to just require('mongoose').schema;
const debug = require('debug')('Backend-Portfolio:Repository.js');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const repoSchema = Schema({
  name: {type: String},
  language: {type: String},
  forks: {type: Number},
  watchers: {type: Number},
  size: {type: Number},
  created_at: {type: String},
  updated_at: {type: String},
  branches_url: {type: String}
});

module.exports = mongoose.model('repositories', repoSchema);
