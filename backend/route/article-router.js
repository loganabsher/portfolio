'use strict';

const debug = require('debug')('Backend-Portfolio:article-router.js');

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');

const bearerAuth = require('../lib/bearer-auth-middleware.js');
const Article = require('../model/Article.js');

const articleRouter = module.exports = Router();

articleRouter.post('api/article', bearerAuth, (req, res, next) => {
  debug('POST: api/article');

  if(!req.body || !req.body.title || !req.body.text) return next(createError(400, 'bad request: missing minimum content requirments'));
  if(!req.user || !req.user._id) return next(createError(401, 'unauthorized: json web token failure, your token either doesn\'t exist or is invalid'));

  const article = new Article({
    author_id: req.user._id,
    title: req.body.title,
    text: req.body.text
  });

  article.save()
    .then((article) => res.json(article));
});

articleRouter.get('api/article/fetch', bearerAuth, jsonParser, (req, res, next) => {
  debug('GET: api/article/fetch');

  if(!req.query) return next(createError(400, 'bad request: no queries were provided for the route', req.query));
  if(!req.user || !req.user._id) return next(createError(401, 'unauthorized: json web token failure, your token either doesn\'t exist or is invalid'));

  if(req.query.me){
    Article.find({'author_id': req.user._id})
      .then((comments) => {
        if(!comments) return next(createError(404, 'not found: no items were found'));
        res.json(comments);
      })
      .catch((err) => next(err));
  }else if(req.query.all){
    Article.find({})
      .then((comments) => {
        if(!comments) return next(createError(404, 'not found: no items were found'));
        res.json(comments);
      })
      .catch((err) => next(err));
  }else if(req.query.article_id){
    Article.findById({'_id': req.query.article_id})
      .then((comment) => {
        if(!comment) return next(createError(404, 'not found: no items were found'));
        res.json(comment);
      })
      .catch((err) => next(err));
  }else{
    return next(createError(400, 'bad request: something went wrong with the query parameters', req.query));
  }
});

articleRouter.put('api/article/edit/:article_id', bearerAuth, jsonParser, (req, res, next) => {
  debug('PUT: api/article/edit/:article_id');

  if(!req.query || !req.query.article_id) return next(createError(400, 'bad request: no article_id was provided'));
  if(!req.body || (!req.body.title && !req.body.text)) return next(createError(400, 'bad request: did not meet the minimum difference requirements, make sure to provide data to update', req.body));
  if(!req.user || !req.user._id) return next(createError(401, 'unauthorized: json web token failure, your token either doesn\'t exist or is invalid'));

  Article.findById({'_id': req.query.article_id})
    .then((article) => {
      if(!article) return next(createError(404, 'not found: no article was found', article));
      if(req.user._id != article.author_id) return next(createError(401, 'unauthorized: json web token failure, your token saved in cookies does not match your user id'));

      if(req.body.title) article.title = req.body.title;
      if(req.body.text) article.text = req.body.text;

      article.updated_at = Date.now();

      return article;
    })
    .then((article) => article.save())
    .then((article) => res.json(article))
    .catch((err) => next(err));
});

articleRouter.delete('api/article/delete/:article_id', bearerAuth, (req, res, next) => {
  debug('DELETE: api/article/delete/:article_id');

  if(!req.query || !req.query.article_id) return next(createError(400, 'bad request: no article_id was provided'));
  if(!req.user || !req.user._id) return next(createError(401, 'unauthorized: json web token failure, your token either doesn\'t exist or is invalid'));

  Article.findById({'_id': req.query.article_id})
    .then((article) => {
      if(!article) return next(createError(404, 'not found: no article was found', article));
      if(req.user._id != article.author_id) return next(createError(401, 'unauthorized: json web token failure, your token saved in cookies does not match your user id'));

      Article.deleteOne({'_id': req.query.article_id})
        .then(() => res.status(204).send())
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});
