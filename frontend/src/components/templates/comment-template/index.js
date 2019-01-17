// NOTE: maybe it would be a cool idea to have each comment in the form of a
// linked list data structure so people can reply to eachother in a chain,
// similar to reddit

'use strict';

import React from 'react';

class commentTempalte extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value: this.props.value
    };
  }

  componentWillReceiveProps(nextProps){
    console.log('comment props', nextProps)
  }

  render(){
    return(
      <div className={comment}>
        <p>{this.state.value}</p>
      </div>
    );
  }
}

export default commentTempalte;
