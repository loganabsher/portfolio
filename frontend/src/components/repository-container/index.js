'use strict';

import React from 'react';
import {connect} from 'react-redux';

import {allRepositoriesRequest} from '../../../actions/repo-actions.js';

import RepoTable from '../tables/repo-table';

class RepositoryContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount(){
    this.props.allRepositories();
  }

  componentWillReceiveProps(nextProps){
    this.setState({repo: nextProps.repo, loading: false});
  }

  render() {
    return(
      <div className='repository-container'>
        <p>thi is the repo page</p>
        {this.state.loading ? <p>...waiting for repos</p> : <RepoTable repos={this.props.repo} />}
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  repo: state.repo
});

let mapDispatchToProps = (dispatch) => ({
  allRepositories: (repo) => dispatch(allRepositoriesRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(RepositoryContainer);
