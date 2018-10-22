'use strict';

export default (state=null, action) => {
  let {type, payload} = action;
  switch(type){
  case 'REPOS_SET':
    return payload;
  default:
    return state;
  }
};
