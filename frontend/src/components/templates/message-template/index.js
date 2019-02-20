'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import commentTempalte from '../comment-template';

class MessageTemplate extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      title: this.props.title,
      text: this.props.text,
      comments: this.props.comments
    };
  }

  componentDidMount(){
    console.log(this.state);
  }

  render(){
    return(
      <div className='message-template'>
        <h2>{this.state.title}</h2>
        <p>{this.state.text}</p>
        <ul>
          {this.state.comments.map((comment, index) => {
            console.log('THIS IS THE COMMENT', comment);
            if(comment.value){
              console.log(comment.value);
              return(<commentTempalte key={index} value={comment.value} />);
            }
          })}
        </ul>
      </div>
    );
  }
}

MessageTemplate.PropTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  comments: PropTypes.array
};

export default MessageTemplate;
