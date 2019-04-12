'use strict';

import React from 'react';
import propTypes from 'prop-types';

import Cowsay from 'cowsay-browser';
import Faker from 'faker';

class CowForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      cowPath: 'default',
      cowOptions: this.props.cowOptions,
      cowsay: null,
      cowText: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCowOptionChange = this.handleCowOptionChange.bind(this);
    this.cowRender = this.cowRender.bind(this);
  }

  handleChange(e){
    let {name, value} = e.target;
    this.setState({[name]: value});
  }

  handleCowOptionChange(e){
    this.setState({cowPath: e.target.options[e.target.selectedIndex].value});
  }

  cowRender(e){
    e.preventDefault();
    if(!this.state.cowText){
      this.setState({
        cowsay: Cowsay.think({
          text: `My name is ${Faker.name.prefix()} ${Faker.name.findName()} I am ${Faker.name.title()}`,
          f: this.state.cowPath
        })
      });
    }else{
      this.setState({
        cowsay: Cowsay.think({
          text: this.state.cowText,
          f: this.state.cowPath
        })
      });
      this.setState({text: ''});
    }
  }

  // NOTE: need to find a way to make "default the default select option"
  render(){
    return(
      <div className='cow-form'>
        <p>cowsay</p>
        <form>
          <select onChange={this.handleCowOptionChange}>
            {this.state.cowOptions.map((ele, index) => <option key={index} value={ele}>{ele}</option>)}
          </select>
          <input
            type='text'
            name='cowText'
            placeholder='cow text'
            value={this.state.cowText}
            onChange={this.handleChange}
          />
          <button onClick={this.cowRender}>click me</button>
          <pre>{this.state.cowsay}</pre>
        </form>
      </div>
    );
  }
}

CowForm.propTypes = {
  cowOptions: propTypes.array
};

export default CowForm;
