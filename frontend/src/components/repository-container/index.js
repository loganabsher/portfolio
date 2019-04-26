'use strict';

import React from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

import {allRepositoriesRequest} from '../../../actions/repo-actions.js';

import RepoTable from '../tables/repo-table';

class RepositoryContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      loading: true
    };
  }

  componentDidMount(){
    this.props.allRepositories();
  }

  componentDidUpdate() {
    if(this.state.repos.length !== this.props.repos.length){
      this.setState({repos: this.props.repos, loading: false});
    }
  }

  render() {
    return(
      <div className='repository-container'>
        <p>thi is the repo page</p>
        {this.state.loading ? <p>...waiting for repos</p> : <RepoTable repos={this.props.repos} />}
      </div>
    );
  }
}

RepositoryContainer.propTypes = {
  allRepositories: propTypes.func,
  repos: propTypes.array
};

const mapStateToProps = (state) => ({
  repos: state.repos
});

const mapDispatchToProps = (dispatch) => ({
  allRepositories: () => dispatch(allRepositoriesRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(RepositoryContainer);
