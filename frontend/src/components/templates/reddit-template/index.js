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
      <li className='reddit-template'>
        <h4>{this.state.post.data.title}</h4>
        <p>by: <a>{this.state.post.data.author}</a></p>
      </li>
    );
  }
}

export default RedditTemplate;
