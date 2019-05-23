'use strict';

import React from 'react';
import propTypes from 'prop-types';

// NOTE: this template needs to handle deletion and updating
class ArticleTemplate extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      article: this.props.article
    };
  }


  render(){
    console.log('article template', this.state.article);
    console.log('article template', this.props);
    // NOTE: bootstrapify this soon
    // also need to catch if there is no text to acompany the title
    return(
      <div className="article-template">
        <h3>{this.state.article.title}</h3>
        <p>{this.state.text}</p>
      </div>
    );
  }
}

ArticleTemplate.propTypes = {
  article: propTypes.object
};

export default ArticleTemplate;
