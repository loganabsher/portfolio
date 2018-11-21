'use strict';

import {combineReducers} from 'redux';

import auth from './auth.js';
import repo from './repo.js';
import message from './message.js';

export default combineReducers({
  auth,
  repo,
  message
});
