'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';

import {tokenSet} from '../../../actions/auth-actions';

import AuthContainer from '../auth-container';
import Dashboard from '../dashboard';
import RepositoryContainer from '../repository-container';

class App extends React.Component {
  render() {
    return(
      <div className='app'>
        <BrowserRouter>
          <section>
            <Route exact path='/auth' component={AuthContainer} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/repository' component={RepositoryContainer} />
          </section>
        </BrowserRouter>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({auth: state.auth});

let mapDispatchToProps = (dispatch) => ({
  tokenSet: (token) => dispatch(tokenSet(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
