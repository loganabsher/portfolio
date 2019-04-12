'use strict';

import React from 'react';
import propTypes from 'prop-types';

class MessageTemplate extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      message: this.props.message
    };

    this.handleComments = this.handleComments.bind(this);
  }

  handleComments(comments, layer){
    return comments.map((comment, index) => {
      // NOTE: gotta fix the keys, its gonna be confusing
      console.log(comment)
      return(
        <div key={index} className={`depth-${layer}`}>
          <h6>comment.title</h6>
          <p>comment.text</p>
          {comment.comments.length > 0 ? this.handleComments(comments, layer++) : <p>reply</p>}
        </div>
      );
    });
  }

  render(){
    return(
      <div className='message-template'>
        <h2>{this.state.message.title}</h2>
        <p>{this.state.message.text}</p>
        {this.state.message.comments.length > 0 ? this.handleComments(this.state.message.comments, 1) : <p>reply temp</p>}
      </div>
    );
  }
}

MessageTemplate.propTypes = {
  message: propTypes.object
};

export default MessageTemplate;
