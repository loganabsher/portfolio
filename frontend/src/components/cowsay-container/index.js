'use strict';

import React from 'react';

import Cowsay from 'cowsay-browser';
import Promise from 'bluebird';

import CowForm from '../forms/cow-form';

class CowsayContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      cowOptions: null
    };
    this.fetchCows = this.fetchCows.bind(this);
  }

  componentDidMount(){
    Promise.all(this.fetchCows())
      .then((list) => this.setState({cowOptions: list}));
  }

  fetchCows(){
    return new Promise((resolve, reject) => {
      Cowsay.list((err, list) => {
        if(err) reject(err);
        return resolve(list);
      });
    });
  }

  render(){
    return(
      <div className='cowsay-container'>
        {!this.state.cowOptions ? <p>...loading</p> : <CowForm cowOptions={this.state.cowOptions} />}
      </div>
    );
  }
}

export default CowsayContainer;
