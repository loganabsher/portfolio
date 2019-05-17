'use strict';

import React from 'react';

// fixing react router:    https://stackoverflow.com/questions/39698609/react-router-nested-routes-error?rq=1

class testContainer extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    console.log('testing nested')
    return(
      <div>
        <p>testing nested routes</p>
      </div>
    );
  }
}

export default testContainer;
