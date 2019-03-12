'use strict';

export default (state=null, action) => {
  let {type, payload} = action;
  switch(type){
  case 'POSTING_CREATE':
    return [payload, ...state];
  case 'POSTING_FETCH':
    return payload;
  case 'POSTING_FETCH_ALL':
    return payload;
  case 'POSTING_FETCH_ALL_USER':
    return payload;
  case 'POSTING_UPDATE':
    return state.map((item) => item._id === payload._id ? payload : item);
  case 'POSTING_DELETE':
    return state.filter((item) => item._id !== payload._id);
  default:
    return state;
  }
};
