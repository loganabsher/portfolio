'use strict';

// NOTE: just futureproofing this
import {combineReducers} from 'redux';

import auth from './auth.js';

export default combineReducers({
  auth
});
