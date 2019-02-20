'use strict';

import React from 'react';
import PropTypes from 'prop-types';

class RedditForm extends React.Component{
  constructor(){
    super();
    this.state = {
      subreddit: '',
      limit: 25,
      error: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    let {name, value} = e.target;
    this.setState({[name]: value});
  }

  handleSubmit(e){
    e.preventDefault();
    if(!this.state.error){
      this.props.onComplete({subreddit: this.state.subreddit, limit: this.state.limit})
        .then(() => this.setState({subreddit: '', limit: 25, error: false}))
        .catch((err) => {
          console.error(err);
          this.setState({error: true});
        });
    }
  }

  render(){
    return(
      <div className='reddit-form'>
        <form>
          <input
            type='text'
            name='subreddit'
            value={this.state.text}
            onChange={this.handleChange}
          />
          <input
            type='number'
            name='limit'
            value={this.state.text}
            onChange={this.handleChange}
          />
          <button type='submit' onClick={this.handleSubmit}>GO</button>
        </form>
      </div>
    );
  }
}

RedditForm.PropTypes = {
  onComplete: PropTypes.func
};

export default RedditForm;
