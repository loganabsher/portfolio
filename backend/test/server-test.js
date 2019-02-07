'use strict';

const chai = require('chai');
const superagent = require('superagent');

require('../server.js');

describe('USER_ROUTES', function(){
  require('./user-router-test.js');
});

describe('REPO_ROUTES', function(){
  require('./repo-router-test.js');
});

superagent.get('/close');
