'use strict';

export default (state=null, action) => {
  let {type, payload} = action;
  switch(type){
  case 'MESSAGE_CREATE':
    return [payload, ...state];
  case 'MESSAGE_FETCH_ALL':
    return payload;
  case 'MESSAGE_FETCH_ME':
    return payload;
  case 'MESSAGE_FETCH_USER':
    return payload;
  case 'MESSAGE_FETCH_SINGULAR':
    return payload;
  case 'MESSAGE_UPDATE':
    return state.map((item) => item._id === payload._id ? payload : item);
  case 'MESSAGE_DELETE':
    return state.filter((item) => item._id !== payload._id);
  default:
    return state;
  }
};
