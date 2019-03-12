'use strict';

export default (state=null, action) => {
  let {type, payload} = action;
  switch(type){
  case 'COMMENT_CREATE':
    return [payload, ...state];
  case 'COMMENT_FETCH':
    return payload;
  case 'COMMENT_FETCH_ALL_USER':
    return payload;
  case 'COMMENT_UPDATE':
    return state.map((item) => item._id === payload._id ? payload : item);
  case 'COMMENT_DELETE':
    return state.filter((item) => item._id !== payload._id);
  default:
    return state;
  }
};
