'use strict';

import React from 'react';
import {connect} from 'react-redux';
import superagent from 'superagent';

import * as util from '../../../lib/util.js';
import * as repoActions from '../../../actions/repo-actions.js';

import RepoTable from '../repo-table';

class RepositoryContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      repos: []
    }
  }

  componentDidMount(){
    console.log('loading repos');
    return this.props.allRepositories(repos)
    .then((repo) => {
      console.log('repos', repo);
    });
  }

  render() {
    return(
      <div className='repository-container'>
        <p>the is the repo page</p>
        <RepoTable dataArr={this.state.repos} />
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  repos: state.repos
});
let mapDispatchToProps = (dispatch) => ({
  allRepositories: (repos) => dispatch(repoActions.allRepositoriesRequest()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RepositoryContainer);
