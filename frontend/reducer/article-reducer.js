'use strict';

export default (state=null, action) => {
  let {type, payload} = action;
  switch(type){
  case 'ARTICLE_CREATE_DEFAULT':
    return [payload, ...state];
  case 'ARTICLE_FETCH_ALL':
    return payload;
  case 'ARTICLE_FETCH_ME':
    return payload;
  case 'ARTICLE_FETCH_SINGULAR':
    return payload;
  default:
    return state;
  }
};
