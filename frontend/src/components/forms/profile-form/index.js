'use strict';

import React from 'react';

class UserSettingsForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    let {name, value} = e.target;
    console.log(this.state);
    this.setState({[name]: value});
  }

  render(){
    return(
      <div className='user-settings-form'>
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
        </form>
      </div>
    );
  }
}

export default UserSettingsForm;
