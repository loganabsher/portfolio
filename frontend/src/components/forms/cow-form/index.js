'use strict';

import React from 'react';

import Cowsay from 'cowsay-browser';
import Faker from 'faker';

class CowForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      cowPath: 'default',
      cowOptions: this.props.cowOptions,
      cowsay: null
    };

    this.cowRender = this.cowRender.bind(this);
    this.handleCowOptionChange = this.handleCowOptionChange.bind(this);
  }

  handleCowOptionChange(e){
    this.setState({cowPath: e.target.options[e.target.selectedIndex].value});
  }

  cowRender(){
    this.setState({
      cowsay: Cowsay.think({
        text: `My name is ${Faker.name.prefix()} ${Faker.name.findName()} I am ${Faker.name.title()}`,
        f: this.state.cowPath
      })
    });
  }

  // NOTE: need to find a way to make "default the default select option"
  render(){
    return(
      <div>
        <p>cowsay</p>
        <select onChange={this.handleCowOptionChange}>
          {this.state.cowOptions.map((ele, index) => <option key={index} value={ele}>{ele}</option>)}
        </select>
        <button onClick={this.cowRender}>click me</button>
        <pre>{this.state.cowsay}</pre>
      </div>
    );
  }
}

export default CowForm;
