'use strict';

import {log, logError} from './util.js';

export default store => (next) => (action) => {
  log('__ACTION__', action);
  try{
    let result = next(action);
    log('__STATE__', store.getState());
    return result;
  }catch(err){
    err.action = action;
    logError('__ERROR__', err);
    return err;
  }
};
