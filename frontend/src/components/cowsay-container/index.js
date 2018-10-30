'use strict';

import React from 'react';

import Cowsay from 'cowsay-browser';
import Faker from 'faker';

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

  fetchCows(){
    return Cowsay.list(function(err, list){
      if(err) throw new Error('bad things');
      console.log(list);
      return list;
    });
  }

  componentDidMount(){
    let cowList = this.fetchCows();
    console.log(cowList);
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
        {!this.state.cowOptions ? <p>...loading</p> :
          <section>
            <p>cowsay</p>
            <select>
              {this.state.cowOptions.forEach((ele) => <option value="ele">{ele}</option>)}
            </select>
            <button onClick={this.cowRender}>click me</button>
            <pre>{this.state.cowsay}</pre>
          </section>
        }
      </div>
    );
  }
}

export default CowsayContainer;
