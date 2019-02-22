'use strict';

import '../../style/main.scss';

import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';

import {tokenSet, tokenCheck} from '../../../actions/auth-actions';

import '../../style/footer.scss';

import NavbarConatiner from '../navbar-container';
import AuthContainer from '../auth-container';
import ProfileContainer from '../profile-container';
import Dashboard from '../dashboard';
import RepositoryContainer from '../repository-container';
import CowsayContainer from '../cowsay-container';
import RedditContainer from '../reddit-container';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      token: false
    };
  }

  componentDidMount(){
    return this.props.tokenCheck();
  }

  render(){
    return(
      <div className='app'>
        <NavbarConatiner />
        <BrowserRouter>
          <section>
            <Route exact path='/auth' component={AuthContainer} />
            <Route exact path='/settings' component={ProfileContainer} />
            <Route exact path='/' component={Dashboard} />
            <Route exact path='/repo' component={RepositoryContainer} />
            <Route exact path='/cowsay' component={CowsayContainer} />
            <Route exact path='/reddit' component={RedditContainer} />
          </section>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({auth: state.auth});

const mapDispatchToProps = (dispatch) => ({
  tokenSet: (token) => dispatch(tokenSet(token)),
  tokenCheck: () => dispatch(tokenCheck())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
