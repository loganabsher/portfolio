'use strict';

import React from 'react';
import propTypes from 'prop-types';

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

  componentWillReceiveProps(nextProps){
    this.setState({profile: nextProps.profile});
  }

  handleChange(e){
    let {name, value} = e.target;
    this.setState({[name]: value});
  }

  // NOTE: could probably combine these two very similar methods

  handleSubmit(e){
    e.preventDefault();
    if(!this.state.error){
      this.props.onComplete(this.state, e.target.value)
        .then(() => this.setState({firstName: '', lastName: '', userName: ''}))
        .catch((error) => {
          console.error(error);
          this.setState({
            error,
          });
        });
    }
  }

// NOTE: I'm wondering if I should make more of a change if there is an existing profile?
// NOTE: very overlycomplicated? I think so
  render(){
    return(
      <div className='profile-form'>
        {this.state.profile ?
          <form>
            <input
              type='text'
              name='firstName'
              placeholder={this.state.profile.firstName ? this.state.profile.firstName : 'first name'}
              value={this.state.text}
              onChange={this.handleChange}
            />
            <input
              type='text'
              name='lastName'
              placeholder={this.state.profile.lastName ? this.state.profile.lastName : 'last name'}
              value={this.state.text}
              onChange={this.handleChange}
            />
            <input
              type='text'
              name='userName'
              placeholder={this.state.profile.userName ? this.state.profile.userName : 'user name'}
              value={this.state.text}
              onChange={this.handleChange}
            />
            <button type='submit' value='submit' onClick={this.handleSubmit}>submit</button>
            <button value='delete' onClick={this.handleSubmit}>delete</button>
          </form> :

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
            <button type='submit' value='submit' onClick={this.handleSubmit}>submit</button>
          </form>
        }
      </div>
    );
  }
}

ProfileForm.propTypes = {
  onComplete: propTypes.func,
  profile: propTypes.object
};

export default ProfileForm;
