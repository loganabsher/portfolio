'use strict';

export default (state=null, action) => {
  let {type, payload} = action;
  switch(type){
  case 'TOKEN_SET':
    return payload;
  case 'LOGOUT':
    return null;
  case 'TOKEN_CHECK':
    return payload;
  default:
    return state;
  }
};
