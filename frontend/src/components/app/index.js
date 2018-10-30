'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';

import {tokenSet} from '../../../actions/auth-actions';

import AuthContainer from '../auth-container';
import Dashboard from '../dashboard';
import RepositoryContainer from '../repository-container';
import CowsayContainer from '../cowsay-container';

class App extends React.Component {
  render() {
    return(
      <div className='app'>
        <BrowserRouter>
          <section>
            <Route exact path='/auth' component={AuthContainer} />
            <Route exact path='/' component={Dashboard} />
            <Route exact path='/repo' component={RepositoryContainer} />
            <Route exact path='/cowsay' component={CowsayContainer} />
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
