'use strict';

// NOTE: this whole page is kind of a mess, I really need to clean things up and think about
// the structure of this part of the application, I'm thinking that updating and deleting
// should be done by the individual messages in MessageTemplate, I'm also thinking some sort of
// limit might be nessessary, as well as creating a link for each individual message that takes
// you to a different thread consisting of the message, its comments and if you have the
// authorization, the ability to manage the post as well as updating and removing it entirly

// importing react packages
import React from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

// importing actions to interact with the backend
import {
  messageCreateRequest,
  messageFetchRequest,
} from '../../../actions/message-actions.js';

// importing sub components
import MessageForm from '../forms/message-form';
import MessageTemplate from '../templates/message-template';

class Dashboard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      message: null
    };

    this.handleNewMessage = this.handleNewMessage.bind(this);
    this.fetchAllMessages = this.fetchAllMessages.bind(this);
  }

  componentDidMount(){
    let message = {type: 'all'};
    this.fetchAllMessages(message);
  }

  componentWillReceiveProps(nextProps){
    console.log('props recieved', nextProps);
    this.setState({message: nextProps.message, loading: false});
  }

  handleNewMessage(message){
    return this.props.messageCreate(message);
  }

  // NOTE: shoule maybe add a limit to the number of messages that are fetched at once??
  fetchAllMessages(message){
    return this.props.messageFetchAll(message);
  }

  render(){
    return(
      <div className='dashboard'>
        <p>hey you made it to the dashboard</p>
        <MessageForm onComplete={this.handleNewMessage} />
        {this.state.message ? this.state.message.map((ele, index) => {
          console.log(ele)
          return(<MessageTemplate key={index} message={ele} />);
        }) : <p>no messages</p>
        }
      </div>
    );
  }
}

Dashboard.propTypes = {
  messageCreate: propTypes.func,
  messageFetchAll: propTypes.func,
};

const mapStateToProps = (state) => ({
  message: state.message
});

const mapDispatchToProps = (dispatch) => {
  return{
    messageCreate: (message) => dispatch(messageCreateRequest(message)),
    messageFetchAll: (message) => dispatch(messageFetchRequest(message))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
