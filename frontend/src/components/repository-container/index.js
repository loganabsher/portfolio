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
    console.log('loading repos');
    this.props.allRepositories();
  }

  componentWillReceiveProps(nextProps){
    console.log('props recieved', nextProps);
    this.setState({repos: nextProps.repos, loading: false});
  }

  render() {
    return(
      <div className='repository-container'>
        {console.log('repos', this.props.repos)}
        <p>thi is the repo page</p>
        {this.state.loading ? <p>...waiting for repos</p> : <RepoTable repos={this.props.repos} />}
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  repos: state.repos
});

let mapDispatchToProps = (dispatch) => ({
  allRepositories: (repos) => dispatch(allRepositoriesRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(RepositoryContainer);
