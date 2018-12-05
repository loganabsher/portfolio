'use strict';

import React from 'react';
import {connect} from 'react-redux';

import UserSettingsForm from '../forms/user-settings-form';

class UserSettingsContainer extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className='user-settings-container'>
        <p>settings page</p>
        <UserSettingsForm />
      </div>
    );
  }
}

export default UserSettingsContainer;
