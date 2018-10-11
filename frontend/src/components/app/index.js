'use strict';

const debug = require('debug')('Frontend-Portfolio:app.js');

import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Link} from 'react-router-dom';

import * as util from '../../../lib/util.js';
import AuthContainer from '../auth-container';
import RepositoryContainer from '../repository-container';

class App extends React.Component {

  render() {
    return(
      <div className='app'>
        <BrowserRouter>
          <section>
            <Route exact path='/login' component={AuthContainer} />
            <Route exact path='/repository' component={RepositoryContainer} />
          </section>
        </BrowserRouter>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  profile: state.profile,
})

export default connect(mapStateToProps)(App);
