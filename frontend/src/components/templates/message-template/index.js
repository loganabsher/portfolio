'use strict';

import React from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

import {messageCreateRequest} from '../../../../actions/message-actions.js';


class MessageTemplate extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      message: this.props.message
    };

    // this.handleComments = this.handleComments.bind(this);
  }

  // handleComments(comments){
  //   return comments.map((comment, index) => {
  //     // NOTE: gotta fix the keys, its gonna be confusing
  //     console.log(comment);
  //     return(
  //       <div key={index}>
  //         <h6>comment.title</h6>
  //         <p>comment.text</p>
  //       </div>
  //     );
  //   });
  // }

  render(){
    console.log(this.props);
    return(
      <div className='message-template' id={this.state.message._id}>
        <h2>{this.state.message.title}</h2>
        <p>{this.state.message.text}</p>
        <hr />
      </div>
    );
  }
}

MessageTemplate.propTypes = {
  message: propTypes.object
};

const mapDispatchToProps = (dispatch) => ({
  messageCreate: (message) => dispatch(messageCreateRequest(message))
});

export default connect(mapDispatchToProps)(MessageTemplate);
