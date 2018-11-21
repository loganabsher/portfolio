'use strict';

export default (state=null, action) => {
  let {type, payload} = action;
  console.log(type, payload);
  switch(type){
  case 'MESSAGE_CREATE':
    return payload;
  default:
    return state;
  }
};
