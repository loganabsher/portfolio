'use strict';

import React from 'react';
import PropTypes from 'prop-types';

class ProfileForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      profile: this.props.profile,
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
            placeholder='first name'
            value={this.state.text}
            onChange={this.handleChange}
          />
          <input
            type='text'
            name='lastName'
            placeholder='last name'
            value={this.state.text}
            onChange={this.handleChange}
          />
          <input
            type='text'
            name='userName'
            placeholder='user name'
            value={this.state.text}
            onChange={this.handleChange}
          />
          <button type='submit' onClick={this.handleSubmit}>submit</button>
        </form>
      </div>
    );
  }
}

ProfileForm.PropTypes = {
  onComplete: PropTypes.func,
  profile: PropTypes.object
};

export default ProfileForm;
