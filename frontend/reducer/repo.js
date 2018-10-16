'use strict';

// NOTE: this may be unnessessary
export default (state=[], action) => {
  let {type, payload} = action;
  console.log(`PAYLOAD ${payload}`);
  switch(type){
    case 'REPOS_SET':
      return payload
    default:
      return state
  }
}
