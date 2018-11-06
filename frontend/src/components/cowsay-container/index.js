'use strict';

import React from 'react';

import Cowsay from 'cowsay-browser';
import Faker from 'faker';
import Promise from 'bluebird';

import CowForm from '../forms/cow-form';

class CowsayContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      cowsay: null,
      cow: 'default',
      cowOptions: null
    };
    this.fetchCows = this.fetchCows.bind(this);
    this.cowRender = this.cowRender.bind(this);
  }

  componentDidMount(){
    Promise.all(this.fetchCows)
      .then((list) => {
        console.log(list);
      });
  }

  fetchCows(){
    return new Promise((resolve, reject) => {
      Cowsay.list((err, list) => {
        if(err) reject(err);
        else if(list !== undefined) resolve(list);
      });
    });
  }

  cowRender(){
    this.setState({
      cowsay: Cowsay.think({
        text: `My name is ${Faker.name.prefix()} ${Faker.name.findName()} I am ${Faker.name.title()}`,
        f: this.state.cowpath
      })
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

// const mapStateToProps = (state) => ({
//   cowOptions: state.cowOptions
// });

export default CowsayContainer;
