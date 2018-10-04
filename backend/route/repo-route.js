'use strict';

const request = require('superagent');
const Router = require('express').Router;

const Repository = require('../model/Repository.js');
const repositoryRoute = module.exports = Router();


// NOTE: add checker to see if the repo exists, if it does, check the updated at and see if it is the same as what was returned
const loader = function () {
  // NOTE: find a way to check the number of repos, replace page=100 with the number of repos
  request.get('https://api.github.com/user/repos?per_page=100&type=owner/')
    .set({'Authorization': 'token ' + process.env.GITHUB_TOKEN})
    .end((req, res) => {
      res.body.forEach((ele) => {
        Repository.findOne({'name': ele.name})
          .then((repo) => {
            console.log(ele.name);
            if(!repo) new Repository(ele).save();
          });
      });
    });
}();

repositoryRoute.get('/api/repositories/:id', (req, res, next) => {
  Repository.findById(req.params.id)
  .then((repo) => {
    res.json(repo);
  })
  .catch(next)
});

// repositoryRoute.get('/api/repositories', )
//
// repositoryRoute.get('/api/repositories/branches', )
