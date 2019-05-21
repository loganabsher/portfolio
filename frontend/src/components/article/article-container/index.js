'use strict';

import React from 'react';

import ArticleForm from '../../forms/article-form';

class ArticleContainer extends React.Component{
  constructor(props){
    super(props);

  }

  render(){
    return(
      <div className="article-container">
        <p>start of the article page</p>
        <ArticleForm />
      </div>
    );
  }
}

export default ArticleContainer;
