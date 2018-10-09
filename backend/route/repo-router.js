'use strict';

const debug = require('debug')('Portfolio:repo-router.js');
const request = require('superagent');
const Router = require('express').Router;

const Repository = require('../model/Repository.js');
const repositoryRouter = module.exports = Router();


// NOTE: add checker to see if the repo exists, if it does, check the updated at and see if it is the same as what was returned
const loader = function () {
  // NOTE: find a way to check the number of repos, replace page=100 with the number of repos
  request.get('https://api.github.com/user/repos?per_page=100&type=owner/')
    .set({'Authorization': 'token ' + process.env.GITHUB_TOKEN})
    .end((req, res) => {
      res.body.forEach((ele) => {
        Repository.findOne({name: ele.name})
          .then((repo) => {
            if(!repo) {
              new Repository(ele).save();
              return;
            }
            if(repo.updated_at !== ele.updated_at) {
              console.log('changes noticed');
              console.log(ele.name, '--', ele.updated_at);
              console.log(repo.name, '--', repo.updated_at);
              let newRepo = {name: ele.name, size: ele.size, created_at: ele.created_at, updated_at: ele.updated_at};
              Repository.findOneAndUpdate({name: ele.name}, newRepo)
                .then((res) => {
                  console.log(res);
                });
            }
          });
      });
    });
};

loader();

repositoryRouter.get('/api/repositories/:id', (req, res, next) => {
  debug('GET: /api/repositories/:id');

  Repository.findById(req.params.id)
    .then((repo) => {
      res.json(repo);
    })
    .catch(next);
});

repositoryRouter.get('/api/repositories/all', (req, res, next) => {
  debug('GET: /api/repositories/all');

  Repository.find({})
    .then((repos) => {
      res.json(repos);
    })
    .catch(next);
});
//
// repositoryRoute.get('/api/repositories/branches', )
