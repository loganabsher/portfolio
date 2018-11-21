'use strict';

import React from 'react';
import connect from 'react-redux';

import MessageForm from '../forms/message-form'

class Dashboard extends React.Component{
  constructor(props){
    super(props);

  }

  render(){
    return(
      <div className='dashboard'>
        <p>hey you made it to the dashboard</p>
        <MessageForm  />
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => {
  return{
    signup: (user) => dispatch(signupRequest(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
