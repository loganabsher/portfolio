'use strict';

export default (state=null, action) => {
  let {type, payload} = action;
  switch(type){
  case 'ARTICLE_CREATE':
    return [payload, ...state];
  case 'ARTICLE_FETCH':
    return payload;
  default:
    return state;
  }
};
