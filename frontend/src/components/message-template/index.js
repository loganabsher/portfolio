'use strict';

import React from 'react';

class MessageTemplate extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      title: this.props.title,
      text: this.props.text,
      comments: this.props.comments
    };
  }

  render(){
    return(
      <div className='message-template'>
        <h2>this.state.title</h2>
        <p>this.state.text</p>
      </div>
    );
  }
}

export default MessageTemplate;
