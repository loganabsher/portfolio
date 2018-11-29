'use strict';

import React from 'react';
import {connect} from 'react-redux';

import {messageCreateRequest} from '../../../actions/message-actions.js';

import MessageForm from '../forms/message-form';
import MessageTemplate from '../message-template';

class Dashboard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      messages: this.props.messages
    };

    this.handleNewMessage = this.handleNewMessage.bind(this);
    this.fetchMessages = this.fetchMessages.bind(this);
    this.handleUpdateMessage = this.handleUpdateMessage.bind(this);
    this.handleRemoveMessage = this.handleRemoveMessage.bind(this);
  }

  handleNewMessage(message){
    return this.props.messageCreate(message);
  }
  // NOTE: shoule maybe add a limit to the number of messages that are fetched at once??
  fetchMessages(){

  }

  handleUpdateMessage(){

  }

  handleRemoveMessage(){

  }

  render(){
    return(
      <div className='dashboard'>
        <p>hey you made it to the dashboard</p>
        <MessageForm onComplete={this.handleNewMessage} />
        {this.state.messages.map((ele) => {
          <MessageTemplate title={ele.title} text={ele.text} comments={ele.comments}  />
        })
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  messages: state.messages
});

const mapDispatchToProps = (dispatch) => {
  return{
    messageCreate: (message) => dispatch(messageCreateRequest(message))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
