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
} from '../../../actions/message-actions.js';

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
  fetchMessage(message_id){
    return this.props.messageFetch(message_id);
  }
  // NOTE: shoule maybe add a limit to the number of messages that are fetched at once??
  fetchAllMessages(){
    return this.props.messageFetchAll();
  }

  fetchAllFromUser(user_id){
    return this.props.messageFetchAllUser(user_id);
  }

  handleUpdateMessage(message){
    return this.props.messageUpdate(message);
  }

  handleRemoveMessage(message_id){
    return this.props.messageDelete(message_id);
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
    messageFetch: (message_id) => dispatch(messageFetchRequest(message_id)),
    messageFetchAll: () => dispatch(messageFetchAllRequest()),
    messageFetchAllUser: (user_id) => dispatch(messageFetchAllUserRequest(user_id)),
    messageUpdate: (message) => dispatch(messageUpdateRequest(message)),
    messageDelete: (message_id) => dispatch(messageDeleteRequest(message_id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
