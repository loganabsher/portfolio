'use strict';

const expect = require('chai').expect;
const request = require('superagent');

require('../server.js');

const url = `http://localhost:${process.env.PORT}`;

describe('repo-router.js test', function () {
  describe('GET: /api/repositories/all', () => {
    describe('with valid path and credentials', () => {
      it('should return a status message of 200', (done) => {
        request.get(`${url}/api/repositories/all`)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            if(err) return done(err);
          });
      });
    });
  });
});
