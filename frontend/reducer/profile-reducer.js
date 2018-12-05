'use strict';

export default (state=null, action) => {
  let {type, payload} = action;
  console.log(type, payload);
  switch(type){
  case 'PROFILE_CREATE':
    return [payload, ...state];
  default:
    return state;
  }
};
