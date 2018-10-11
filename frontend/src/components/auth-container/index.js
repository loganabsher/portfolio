'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Link} from 'react-router-dom';

class AuthContainer extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className='auth-container'>
        <p>forms go here</p>
      </div>
    )
  }
}

export default AuthContainer;
