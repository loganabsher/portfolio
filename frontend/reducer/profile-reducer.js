'use strict';

export default (state=null, action) => {
  let {type, payload} = action;
  switch(type){
  case 'PROFILE_CREATE':
    return [payload, ...state];
  case 'PROFILE_FETCH':
    return payload;
  default:
    return state;
  }
};
