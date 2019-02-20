'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {subredditFetchRequest} from '../../../actions/reddit-actions.js';

import RedditForm from '../forms/reddit-form';
import RedditTemplate from '../templates/reddit-template';

class RedditContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      error: false,
      loading: true
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps){
    console.log('props received:', nextProps);
    this.setState({posts: nextProps.reddit, loading: false});

  }

  handleSubmit(reddit){
    return this.props.fetchSubreddit(reddit);
  }

  render(){
    return(
      <div className='reddit-container'>
        <h1>Reddit</h1>
        <RedditForm onComplete={this.handleSubmit} />
        {!this.state.loading ?
          <ul>
            {this.state.posts.map((post, index) => {
              console.log(post);
              return(
                <RedditTemplate key={index} post={post} />
              );
            })}
          </ul> : <p>welcome to the reddit side of things</p>}
      </div>
    );
  }
}

RedditContainer.PropTypes = {
  fetchSubreddit: PropTypes.func,
  reddit: PropTypes.object
};

const mapStateToProps = (state) => ({
  reddit: state.reddit,
});

const mapDispatchToProps = (dispatch) => {
  return{
    fetchSubreddit: (reddit) => dispatch(subredditFetchRequest(reddit))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RedditContainer);
