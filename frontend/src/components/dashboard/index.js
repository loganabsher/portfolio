'use strict';

import React from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

import {
  messageCreateRequest,
  messageFetchRequest,
  messageFetchAllRequest,
  messageFetchAllUserRequest,
  messageUpdateRequest,
  messageDeleteRequest
} from '../../../actions/posting-actions.js';

import MessageForm from '../forms/message-form';
import MessageTemplate from '../templates/message-template';

class Dashboard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      messages: null
    };

    this.handleNewMessage = this.handleNewMessage.bind(this);
    this.fetchAllMessages = this.fetchAllMessages.bind(this);
    this.handleUpdateMessage = this.handleUpdateMessage.bind(this);
    this.handleRemoveMessage = this.handleRemoveMessage.bind(this);
  }

  componentDidMount(){
    this.fetchAllMessages();
  }

  componentWillReceiveProps(nextProps){
    console.log('props recieved', nextProps);
    this.setState({messages: nextProps.messages, loading: false});
  }

  handleNewMessage(message){
    return this.props.messageCreate(message);
  }
  fetchMessage(messageId){
    return this.props.messageFetch(messageId);
  }
  // NOTE: shoule maybe add a limit to the number of messages that are fetched at once??
  fetchAllMessages(){
    return this.props.messageFetchAll();
  }

  fetchAllFromUser(userId){
    return this.props.messageFetchAllUser(userId);
  }

  handleUpdateMessage(message){
    return this.props.messageUpdate(message);
  }

  handleRemoveMessage(messageId){
    return this.props.messageDelete(messageId);
  }

  render(){
    return(
      <div className='dashboard'>
        <p>hey you made it to the dashboard</p>
        <MessageForm onComplete={this.handleNewMessage} />
        {this.state.messages ? this.state.messages.map((ele, index) => {
          return(<MessageTemplate key={index} message={ele} />);
        }) : <p>no messages</p>
        }
      </div>
    );
  }
}

Dashboard.propTypes = {
  messageCreate: propTypes.func,
  messageFetch: propTypes.func,
  messageFetchAll: propTypes.func,
  messageFetchAllUser: propTypes.func,
  messageUpdate: propTypes.func,
  messageDelete: propTypes.func,
  message: propTypes.array
};

const mapStateToProps = (state) => ({
  messages: state.messages
});

// NOTE: the update request should maybe be moved to the individual message templates
const mapDispatchToProps = (dispatch) => {
  return{
    messageCreate: (message) => dispatch(messageCreateRequest(message)),
    messageFetch: (messageId) => dispatch(messageFetchRequest(messageId)),
    messageFetchAll: () => dispatch(messageFetchAllRequest()),
    messageFetchAllUser: (userId) => dispatch(messageFetchAllUserRequest(userId)),
    messageUpdate: (message) => dispatch(messageUpdateRequest(message)),
    messageDelete: (messageId) => dispatch(messageDeleteRequest(messageId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
