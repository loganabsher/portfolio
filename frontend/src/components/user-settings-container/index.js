'use strict';

import React from 'react';
import {connect} from 'react-redux';



class UserSettingsContainer extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className='user-settings-container'>
        <p>settings page</p>
      </div>
    );
  }
}

export default UserSettingsContainer;
