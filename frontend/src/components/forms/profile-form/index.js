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

  componentWillReceiveProps(nextProps){
    console.log('hey we got those props down here');
    this.setState({profile: nextProps.profile});
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
            <button type='submit' onClick={this.handleSubmit}>submit</button>
            <button onClick={this.props.handleDelete}>delete</button>
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
            <button type='submit' onClick={this.handleSubmit}>submit</button>
          </form>
        }
      </div>
    );
  }
}

ProfileForm.PropTypes = {
  onComplete: PropTypes.func,
  profile: PropTypes.object
};

export default ProfileForm;
