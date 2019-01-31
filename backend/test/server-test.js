'use strict';

// const Coveralls = require('coveralls');
// Coveralls.wear!
const chai = require('chai')

require('../server.js');

setTimeout(() => {

}, 4000)

describe('USER_ROUTES', function(){
  require('./user-router-test.js');
});

describe('REPO_ROUTES', function(){
  require('./repo-router-test.js');
});
