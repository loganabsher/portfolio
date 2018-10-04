'use strict';

const request = require('superagent');
const Router = require('express').Router;

const RepositorySchema = require('../model/Repository.js');

// const check = function () {
//   request.get('https://api.github.com/users/loganabsher/repositories')
//   .end((req, res) => {
//     console.log(res);
//   });
// }();

module.exports = function () {
  request.get('https://api.github.com/user/repos?per_page=100&type=owner/')
    .set({'Authorization': 'token ' + process.env.GITHUB_TOKEN})
    .end((req, res) => {
      res.body.forEach((ele) => {
        let repo = new RepositorySchema(ele);
        console.log(repo);
        repo.save();
      });
    });
}();

const loadRoute = module.exports = Router();
