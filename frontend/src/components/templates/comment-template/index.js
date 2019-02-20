'use strict';

import React from 'react';
import PropTypes from 'prop-types';

// NOTE: this page still needs a lot of work, I eventually need to decide what I'm going to do here

class CommentTemplate extends React.Component{
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

CommentTemplate.PropTypes = {
  value: PropTypes.object
};

export default CommentTemplate;

// NOTE: maybe it would be a cool idea to have each comment in the form of a
// linked list data structure so people can reply to eachother in a chain,
// similar to reddit
