'use strict';

import React from 'react';

class ArticleForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      title: '',
      text: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    let {name, value} = e.target;
    this.setState({[name]: value});
  }

  handleSubmit(e){
    // NOTE: this needs to be more personalized for this page
    e.preventDefault();
    this.props.onComplete(this.state)
      .then(() => this.setState({title: '', text: ''}))
      .catch((error) => {
        console.error(error);
        this.setState({
          error,
        });
      });
  }

  render(){
    return(
      <form>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            className="form-control"
            type='text'
            name='title'
            placeholder='title'
            value={this.state.title}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Text</label>
          <input
            className="form-control"
            type='text'
            name='text'
            placeholder='text'
            value={this.state.text}
            onChange={this.handleChange}
          />
        </div>
        <button className="btn btn-primary" type='submit' onClick={this.handleSubmit}>Submit</button>
      </form>
    );
  }
}

export default ArticleForm;
