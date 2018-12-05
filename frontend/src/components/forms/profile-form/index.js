'use strict';

import React from 'react';

class UserSettingsForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      userName: '',
      error: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    let {name, value} = e.target;
    console.log(this.state);
    this.setState({[name]: value});
  }

  handleSubmit(e){
    e.preventDefault();
    if(!this.state.error){
      this.props.onComplete(this.state)
        .then(() => this.setState({firstName: '', lastName: '', userName: ''}))
        .catch((error) => {
          console.error(error);
          this.setState({
            error,
          });
        });
    }
  }

  render(){
    return(
      <div className='profile-form'>
        <form>
          <input
            type='text'
            name='firstName'
            value={this.state.text}
            onChange={this.handleChange}
          />
          <input
            type='text'
            name='lastName'
            value={this.state.text}
            onChange={this.handleChange}
          />
          <input
            type='text'
            name='userName'
            value={this.state.text}
            onChange={this.handleChange}
          />
          <button type='submit' onClick={this.handleSubmit}>submit</button>
        </form>
      </div>
    );
  }
}

export default UserSettingsForm;
