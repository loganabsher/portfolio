'use strict';

const debug = require('debug')('Frontend-Portfolio:app.js');

import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Link} from 'react-router-dom';

import AuthContainer from '../auth-container';
import RepositoryContainer from '../repository-container';

console.log('yes');

class App extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <div className='app'>
        <BrowserRouter>
          <section>
            <button>test</button>
            <Route exact path='/login' component='AuthContainer' />
            <Route exact path='/repository' component='RepositoryContainer' />
          </section>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
