'use strict';

import React from 'react';
import {connect} from 'react-redux';
import propTypes from 'prop-types';

import ArticleForm from '../../forms/article-form';
import ArticleTemplate from '../../templates/article-template';

import {articleCreateRequest, articleFetchRequest} from '../../../../actions/article-actions.js';

class ArticleContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      article: null
    };

    this.handleNewArticle = this.handleNewArticle.bind(this);
  }

  componentDidMount(){
    let article = {type: 'all'};
    return this.props.articleFetch(article);
  }

  componentWillReceiveProps(nextProps){
    this.setState({article: nextProps.article});
  }

  handleNewArticle(article){
    console.log('article-container : ', article);
    return this.props.articleCreate(article);
  }

  render(){
    console.log(this.state.article)
    return(
      <div className="article-container">
        <p>start of the article page</p>
        <ArticleForm onComplete={this.handleNewArticle} />
        {this.state.article ? this.state.article.map((article, index) => {
          console.log(article)
          return (<ArticleTemplate article={article} key={index} />);
        }) : <p>...loading</p>}
      </div>
    );
  }
}

ArticleContainer.propTypes = {
  article: propTypes.array
};

const mapStateToProps = (state) => ({
  article: state.article
});

const mapDispatchToProps = (dispatch) => ({
  articleCreate: (article) => dispatch(articleCreateRequest(article)),
  articleFetch: (article) => dispatch(articleFetchRequest(article))
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleContainer);
