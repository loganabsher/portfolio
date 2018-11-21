'use strict';

import React from 'react';
import {connect} from 'react-redux';

import {messageCreateRequest} from '../../../actions/repo-actions.js';

import MessageForm from '../forms/message-form';

class Dashboard extends React.Component{
  constructor(props){
    super(props);

    this.handleNewMessage = this.handleNewMessage.bind(this);
  }

  handleNewMessage(message){
    return this.props.messageCreate(message);
  }

  render(){
    return(
      <div className='dashboard'>
        <p>hey you made it to the dashboard</p>
        <MessageForm onComplete={this.handleNewMessage} />
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => {
  return{
    messageCreate: (message) => dispatch(messageCreateRequest(message))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
