'use strict';

import React from 'react';

class Message extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      title: this.props.title,
      text: this.props.text
    };
  }

  render(){
    return(
      <div className='message'>
        <h2>this.state.title</h2>
        <p>this.state.text</p>
      </div>
    );
  }
}

export default Message;
