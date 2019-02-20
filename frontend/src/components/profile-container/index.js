'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {profileCreateRequest, profileFetchRequest} from '../../../actions/profile-actions.js';

import ProfileForm from '../forms/profile-form';

class ProfileContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      profile: this.props.profile
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
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
        <ProfileForm onComplete={this.handleSubmit} profile={this.state.profile} />
      </div>
    );
  }
}

ProfileContainer.PropTypes = {
  history: PropTypes.func,
  profileFetch: PropTypes.func,
  profileCreate: PropTypes.func,
  profile: PropTypes.object
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

const mapDispatchToProps = (dispatch) => {
  return{
    profileCreate: (profile) => dispatch(profileCreateRequest(profile)),
    profileFetch: () => dispatch(profileFetchRequest())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
