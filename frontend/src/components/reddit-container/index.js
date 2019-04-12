'use strict';

import React from 'react';
import propTypes from 'prop-types';
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

  componentDidMount(){
    this.setState({posts: JSON.parse(localStorage.getItem('posts'))});
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.posts !== this.state.posts) {
  //     let firebaseRef=firebase.database().ref(this.state.path);
  //     this.setState({firebaseRef});
  //   }
  // }

  componentWillReceiveProps(nextProps){
    localStorage.setItem('posts', JSON.stringify(nextProps.reddit));
    this.setState({posts: nextProps.reddit});
  }

  handleSubmit(reddit){
    return this.props.fetchSubreddit(reddit);
  }

  render(){
    return(
      <div className='reddit-container'>
        <h1>Reddit</h1>
        <RedditForm onComplete={this.handleSubmit} />
        {this.state.posts ?
          <ul>
            {this.state.posts.map((post, index) => {
              return(
                <RedditTemplate key={index} post={post.data} />
              );
            })}
          </ul> : <p>welcome to the reddit side of things</p>}
      </div>
    );
  }
}

RedditContainer.propTypes = {
  fetchSubreddit: propTypes.func,
  reddit: propTypes.object
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
