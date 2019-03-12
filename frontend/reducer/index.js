'use strict';

import {combineReducers} from 'redux';

import auth from './auth-reducer.js';
import profile from './profile-reducer.js';
import repos from './repo-reducer.js';
import posting from './posting-reducer.js';
import comment from './comment-reducer.js';
import reddit from './reddit-reducer.js';

export default combineReducers({
  auth,
  profile,
  repos,
  posting,
  comment,
  reddit
});
