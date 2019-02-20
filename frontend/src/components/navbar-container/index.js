'use strict';

import './_navbar.scss';

import React from 'react';

class NavbarContainer extends React.Component{
  render(){
    return(
      <div className='navbar'>
        <ul className='navbar-list'>
          {/* NOTE: should maybe consider bringing in link from react router instead of using a tags */}
          <li><a href='/'>Home</a></li>
          <li><a href='/repo'>Repos</a></li>
          <li><a href='/cowsay'>Cowsay</a></li>
          <li><a href='/reddit'>Reddit</a></li>
          <li><a href='/settings'>Settings</a></li>
        </ul>
      </div>
    );
  }
}

export default NavbarContainer;
