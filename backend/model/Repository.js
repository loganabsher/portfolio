'use strict';

// NOTE: perhaps change this to just require('mongoose').schema;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const repoSchema = Schema ({
  name: {type: String},
  full_name: {type: String},
  forks: {type: Array},
  watchers: {type: Array},
});

const Repository = module.exports = mongoose.model('Repository', repoSchema);
