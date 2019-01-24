'use strict';

export default (state=null, action) => {
  let {type, payload} = action;
  switch(type){
  case 'SUBREDDIT_FETCH':
    return payload;
  default:
    return state;
  }
};
