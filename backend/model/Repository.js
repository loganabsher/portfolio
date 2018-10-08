'use strict';

// NOTE: perhaps change this to just require('mongoose').schema;
const debug = require('debug')('Portfolio:Repository.js');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const repoSchema = Schema ({
  name: {type: String},
  size: {type: Number},
  created_at: {type: String},
  updated_at: {type: String}
});

const Repository = module.exports = mongoose.model('repositories', repoSchema);
