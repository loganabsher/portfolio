'use strict';

import React from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

import {articleDeleteRequest} from '../../../../actions/article-actions.js';

// NOTE: this template needs to handle deletion and updating
class ArticleTemplate extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      article: this.props.article
    };

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(e){
    // NOTE should maybe make a alert asking the user if they really want to delete this before continuing
    let article_id = e.currentTarget.parentNode.id;
    return this.props.articleDelete(article_id);
  }


  render(){
    // NOTE: bootstrapify this soon
    // also need to catch if there is no text to acompany the title
    return(
      <div className="article-template" id={this.state.article._id}>
        <button onClick={this.handleDelete}>X</button>
        <h3>{this.state.article.title}</h3>
        <p>{this.state.article.text}</p>
      </div>
    );
  }
}

ArticleTemplate.propTypes = {
  article: propTypes.object
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    articleDelete: (article_id) => dispatch(articleDeleteRequest(article_id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleTemplate);
