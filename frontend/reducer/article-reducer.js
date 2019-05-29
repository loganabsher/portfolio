'use strict';

// NOTE: should maybe specialize these a little bit better, but I'm just keeping it very simple to see if they work properly
export default (state=null, action) => {
  let {type, payload} = action;
  switch(type){
  case 'ARTICLE_CREATE_DEFAULT':
    return [payload, ...state];
  case 'ARTICLE_CREATE_ERROR':
    return payload;
  case 'ARTICLE_FETCH_ALL':
    return payload;
  case 'ARTICLE_FETCH_ME':
    return payload;
  case 'ARTICLE_FETCH_SINGULAR':
    return payload;
  case 'ARTICLE_FETCH_ERROR':
    return payload;
  case 'ARTICLE_DELETE_DEFAULT':
    return payload;
  case 'ARTICLE_DELETE_ERROR':
    return payload;
  default:
    return state;
  }
};
