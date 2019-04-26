'use strict';

import React from 'react';
import propTypes from 'prop-types';

class RedditTemplate extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      post: this.props.post
    };
  }

  render(){
    console.log(this.state.post);
    return(
      <li className='reddit-template'>
        <h4>{this.state.post.title}</h4>
        <p>by: <a href={`https://www.reddit.com/user/${this.state.post.author}`} >{`u/${this.state.post.author}`}</a></p>
      </li>
    );
  }
}

RedditTemplate.propTypes = {
  post: propTypes.object
};

export default RedditTemplate;
