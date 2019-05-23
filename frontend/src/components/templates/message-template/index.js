'use strict';

import React from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';


class MessageTemplate extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      message: this.props.message
    };

    this.handleComments = this.handleComments.bind(this);
  }

  handleComments(comments){
    return comments.map((comment, index) => {
      // NOTE: gotta fix the keys, its gonna be confusing
      console.log(comment);
      return(
        <div key={index}>
          <h6>comment.title</h6>
          <p>comment.text</p>
        </div>
      );
    });
  }

  render(){
    return(
      <div className='message-template' id={this.state.message._id}>
        <h2>{this.state.message.title}</h2>
        <p>{this.state.message.text}</p>
        {this.state.message.next.length > 0 ? this.handleComments(this.state.message.next) : <p>reply temp</p>}
        <hr />
      </div>
    );
  }
}

MessageTemplate.propTypes = {
  message: propTypes.array
};

const mapStateToProps = (state) => ({
  message: state.message
});

const mapDispatchToProps = (dispatch) => ({
  messageCreate: (message) => dispatch(messageCreateRequest(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageTemplate);
