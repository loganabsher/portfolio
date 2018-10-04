'use strict';

const request = require('superagent');

const RepositorySchema = require('../model/Repository.js');

console.log(process.env.GITHUB_TOKEN);
console.log(process.env.PORT);
console.log(process.env.APP_SECRET);

module.exports = function () {
  request.get('https://api.github.com/user/repos?type=owner/')
    .set({'Authorization': 'token ' + process.env.GITHUB_TOKEN})
    .then((res) => {
      res.body.forEach((ele) => {
        new RepositorySchema(ele).save();
      });
    });
};
