'use strict';

import React from 'react';
import {connect} from 'react-redux';

import {subredditFetchRequest} from '../../../actions/reddit-actions.js';

import RedditForm from '../forms/reddit-form';
import RedditTemplate from '../templates/reddit-template';

class RedditContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      posts: null,
      error: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillRevieveProps(nextProps){
    console.log(nextProps);
    this.setState({})
  }

  handleSubmit(queries){
    return this.props.fetchSubreddit(queries);
  }

  render(){
    return(
      <div className='reddit-container'>
        <h1>Reddit</h1>
        <RedditForm onComplete={this.handleSubmit} />
        {this.state.posts ? this.state.posts.map((post, index) => {
          console.log(post);
          return(<RedditTemplate key={index} post={post} />);
        }) : <p>welcome to the reddit side of things</p>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts,
});

const mapDispatchToProps = (dispatch) => {
  return{
    fetchSubreddit: (queries) => dispatch(subredditFetchRequest(queries))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RedditContainer);
