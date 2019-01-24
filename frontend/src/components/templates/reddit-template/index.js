'use strict';

import React from 'react';

class RedditTemplate extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      post: this.props.post
    };
  }

  render(){
    return(
      <div className='reddit-template'>
        <h2>POST {this.state.post}</h2>
      </div>
    );
  }
}

export default RedditTemplate;
