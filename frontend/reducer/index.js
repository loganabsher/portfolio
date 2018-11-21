'use strict';

import {combineReducers} from 'redux';

import auth from './auth-reducer.js';
import repo from './repo-reducer.js';
import message from './message-reducer.js';

export default combineReducers({
  auth,
  repo,
  message
});
