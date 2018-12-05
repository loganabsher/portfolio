'use strict';

import React from 'react';
import {connect} from 'react-redux';

import {profileCreateRequest} from '../../../actions/profile-actions.js';

import ProfileForm from '../forms/profile-form';

class UserSettingsContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      profile: this.props.profile
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(profile){
    return this.props.profileCreate(profile)
      .then(() => this.props.history.push('/'));
  }

  render(){
    return(
      <div className='profile-container'>
        <p>settings page</p>
        <ProfileForm onComplete={this.handleSubmit} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile
});

// NOTE: the update request should maybe be moved to the individual message templates
const mapDispatchToProps = (dispatch) => {
  return{
    profileCreate: (profile) => dispatch(profileCreateRequest(profile))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingsContainer);
