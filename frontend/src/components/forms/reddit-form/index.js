'use strict';

import React from 'react';
import propTypes from 'prop-types';

class RedditForm extends React.Component{
  constructor(){
    super();
    this.state = {
      subreddit: 'aww',
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
      this.props.onComplete({subreddit: this.state.subreddit, limit: this.state.limit - 1})
        .then(() => this.setState({error: false}))
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
            placeholder={this.state.subreddit}
          />
          <input
            type='number'
            name='limit'
            value={this.state.text}
            onChange={this.handleChange}
            placeholder={this.state.limit}
          />
          <button type='submit' onClick={this.handleSubmit}>GO</button>
        </form>
      </div>
    );
  }
}

RedditForm.propTypes = {
  onComplete: propTypes.func
};

export default RedditForm;
