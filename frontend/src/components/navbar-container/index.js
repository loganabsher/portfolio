'use strict';

import React from 'react';

import './_navbar.scss';

class NavbarContainer extends React.Component{
  constructor(props){
    super(props);

  }

  render(){
    return(
      <div className='navbar'>
        <ul className='navbar-list'>
          {/* NOTE: should maybe consider bringing in link from react router instead of using a tags */}
          <li><a href='/'>Home</a></li>
          <li><a href='/repo'>Repos</a></li>
          <li><a href='/cowsay'>Cowsay</a></li>
          <li><a href='/settings'>Settings</a></li>
        </ul>
      </div>
    );
  }
}

export default NavbarContainer;
