'use strict';

export default (state=null, action) => {
  let {type, payload} = action;
  console.log(type, payload);
  switch(type){
  case 'TOKEN_SET':
    return payload;
  case 'LOGOUT':
    return null;
  default:
    return state;
  }
};
