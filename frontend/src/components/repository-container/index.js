'use strict';

import React from 'react';
import PropTypes from 'prop-types';
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

  static getDerivedStateFromProps(nextProps, prevState){
    console.log('getDerivedStateFromProps invoked')
    console.log(nextProps)
    if(nextProps.repos !== prevState.repos){
      return {repos: nextProps.repos};
    }
    else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate invoked')
    console.log(prevProps, prevState)
    if(prevProps.repos !== this.props.repos){
      //Perform some operation here
      this.setState({repos: this.props.repos});
      // this.classMethod();
    }
  }

  // componentWillReceiveProps(nextProps){
  //   console.log('props recieved', nextProps);
  //   this.setState({repos: nextProps.repos, loading: false});
  // }

  render() {
    return(
      <div className='repository-container'>
        <p>thi is the repo page</p>
        {this.state.loading ? <p>...waiting for repos</p> : <RepoTable repos={this.props.repos} />}
      </div>
    );
  }
}

RepositoryContainer.PropTypes = {
  allRepositories: PropTypes.func,
  repos: PropTypes.array
};

const mapStateToProps = (state) => ({
  repos: state.repos
});

const mapDispatchToProps = (dispatch) => ({
  allRepositories: () => dispatch(allRepositoriesRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(RepositoryContainer);
