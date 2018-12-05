'use strict';

import React from 'react';

class MessageForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      title: '',
      text: '',
      photos: '',
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
      this.props.onComplete(this.state)
        .then(() => this.setState({title: '', text: '', photos: ''}))
        .catch((error) => {
          this.setState({
            error,
          });
        });
    }
  }

  render(){
    return(
      <div className='message-form'>
        <form>
          <input
            type='text'
            name='title'
            value={this.state.title}
            onChange={this.handleChange}
          />

          <input
            type='text'
            name='text'
            value={this.state.text}
            onChange={this.handleChange}
          />

          <input
            type='text'
            name='photos'
            value={this.state.photos}
            onChange={this.handleChange}
          />
          <button type='submit' onClick={this.handleSubmit}>Post</button>
        </form>
      </div>
    );
  }
}

export default MessageForm;
