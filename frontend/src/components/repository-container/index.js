'use strict';

import React from 'react';
import {connect} from 'react-redux';
import superagent from 'superagent';

import * as util from '../../../lib/util.js';
import {allRepositoriesRequest} from '../../../actions/repo-actions.js';

import RepoTable from '../repo-table';

class RepositoryContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: null
    }
  }

  componentDidMount(){
    console.log('loading repos');
    this.props.allRepositories()
  }

  render() {
    return(
      <div className='repository-container'>
        <p>thi is the repo page</p>
        {!this.state.repos ? <p>...loading</p> : <RepoTable />}
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  repos: state.repos,
});

let mapDispatchToProps = (dispatch) => ({
  allRepositories: () => dispatch(allRepositoriesRequest())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RepositoryContainer);
