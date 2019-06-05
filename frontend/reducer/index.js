'use strict';

import {combineReducers} from 'redux';

import article from './article-reducer.js';
import auth from './auth-reducer.js';
import profile from './profile-reducer.js';
import repos from './repo-reducer.js';
import message from './message-reducer.js';
import comment from './comment-reducer.js';
import reddit from './reddit-reducer.js';

export default combineReducers({
  article,
  auth,
  profile,
  repos,
  message,
  comment,
  reddit
});
