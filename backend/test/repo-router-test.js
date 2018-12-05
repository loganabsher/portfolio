// 'use strict';
//
// const expect = require('chai').expect;
// const superagent = require('superagent');
//
// require('../server.js');
//
// const url = `http://localhost:${process.env.PORT}`;
//
// describe('repo-router.js test', function () {
//   describe('GET: /api/repository', () => {
//     describe('with valid path and credentials', () => {
//       it('should return a status message of 200', (done) => {
//         superagent.get(`${url}/api/repository`)
//           .end((err, res) => {
//             expect(res.status).to.equal(200);
//             if(err) return done(err);
//           });
//       });
//     });
//   });
// });
