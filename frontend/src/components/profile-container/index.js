'use strict';

import React from 'react';
import {connect} from 'react-redux';

import {profileCreateRequest, profileFetchRequest} from '../../../actions/profile-actions.js';

import ProfileForm from '../forms/profile-form';

class UserSettingsContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      profile: this.props.profile
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    console.log('loading profile');
    this.props.profileFetch();
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
    profileCreate: (profile) => dispatch(profileCreateRequest(profile)),
    profileFetch: () => dispatch(profileFetchRequest())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingsContainer);
