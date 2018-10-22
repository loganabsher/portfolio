'use strict';

import {createStore, applyMiddleware} from 'redux';

import reducer from '../reducer';
import thunk from './redux-thunk.js';
import reporter from './redux-reporter.js';

const storeCreate = () => createStore(reducer, applyMiddleware(thunk, reporter));

export default storeCreate;
