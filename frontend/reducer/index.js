'use strict';

import {combineReducers} from 'redux';

import auth from './auth-reducer.js';
import profile from './profile-reducer.js';
import repos from './repo-reducer.js';
import messages from './message-reducer.js';
import reddit from './reddit-reducer.js';

export default combineReducers({
  auth,
  profile,
  repos,
  messages,
  reddit
});
