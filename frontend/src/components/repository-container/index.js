'use strict';

import React from 'react';
import {Connect} from 'react-redux';

class RepositoryContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className='repository-container'>
        <p>the is the repo page</p>
      </div>
    )
  }
}

export default RepositoryContainer;
