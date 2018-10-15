'use strict';

import React from 'react';
import {Connect} from 'react-redux';

import RepoTable from '../repo-table';

class RepositoryContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className='repository-container'>
        <p>the is the repo page</p>
        <RepoTable />
      </div>
    )
  }
}

export default RepositoryContainer;
