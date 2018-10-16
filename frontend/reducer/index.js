'use strict';

// NOTE: just futureproofing this
import {combineReducers} from 'redux';

import auth from './auth.js';
import repo from './repo.js';

export default combineReducers({
  auth,
  repo
});
