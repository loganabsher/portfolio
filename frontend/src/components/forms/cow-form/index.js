'use strict';

import React from 'react';

class CowForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      cowOptions: this.props.cowOptions
    }
  }

  render(){
    return(
      <div>
        <p>cowsay</p>
        <select>
          {this.state.cowOptions.forEach((ele) => <option value="ele">{ele}</option>)}
        </select>
        <button onClick={this.cowRender}>click me</button>
        <pre>{this.state.cowsay}</pre>
      </div>
    );
  }
}

export default CowForm;
