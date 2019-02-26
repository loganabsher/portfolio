'use strict';

import '../../style/main.scss';

import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';

import {tokenSet, tokenCheckRequest} from '../../../actions/auth-actions';
import {readCookie} from '../../../lib/util.js';

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
      auth: false
    };
  }

  // NOTE: maybe I should just set a localStorage variable to check if they are valid
  componentDidMount(){
    let token = readCookie('portfolio-login-token');
    return this.props.tokenCheckRequest(token);
  }


  // NOTE: pretty sure this will create an infinite loop
  componentWillReceiveProps(nextProps){
    console.log('props recieved', nextProps);
    if(nextProps.auth){
      this.setState({auth: true});
    }
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
  tokenCheckRequest: (token) => dispatch(tokenCheckRequest(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
