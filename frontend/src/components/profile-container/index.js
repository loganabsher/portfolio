'use strict';

import React from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

import {profileCreateRequest, profileFetchRequest, profileUpdateRequest, profileDeleteRequest} from '../../../actions/profile-actions.js';

import ProfileForm from '../forms/profile-form';

class ProfileContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      profile: this.props.profile || null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({profile: nextProps.profile});
  }
  componentDidMount(){
    this.props.profileFetch();
  }

  handleSubmit(profile, type){
    console.log(this)
    console.log(this.props)
    if(type == 'submit'){
      if(this.state.profile){
        return this.props.profileUpdate(profile);
      }else{
        return this.props.profileCreate(profile)
          .then(() => this.props.history.push('/'));
      }
    }else if(type == 'delete'){
      return this.props.profileDelete();
    }else{
      console.error('unsupported type', type);
    }
  }

  render(){
    return(
      <div className='profile-container'>
        <p>settings page</p>
        <ProfileForm onComplete={this.handleSubmit} profile={this.state.profile ? this.state.profile : null} />
      </div>
    );
  }
}

ProfileContainer.propTypes = {
  history: propTypes.func,
  profileFetch: propTypes.func,
  profileCreate: propTypes.func,
  profile: propTypes.object
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

const mapDispatchToProps = (dispatch) => {
  return{
    profileCreate: (profile) => dispatch(profileCreateRequest(profile)),
    profileFetch: () => dispatch(profileFetchRequest()),
    profileUpdate: (profile) => dispatch(profileUpdateRequest(profile)),
    profileDelete: () => dispatch(profileDeleteRequest())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
