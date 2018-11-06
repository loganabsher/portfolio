'use strict';

import React from 'react';

class CowForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      cowOptions: this.props.cowOptions
    };
  }

  render(){
    console.log(this.state.cowOptions)
    return(
      <div>
        <p>cowsay</p>
        <select>
          {this.state.cowOptions.map((ele, index) => <option key={index} value={ele}>{ele}</option>)}
        </select>
        <button onClick={this.cowRender}>click me</button>
        <pre>{this.state.cowsay}</pre>
      </div>
    );
  }
}

export default CowForm;
