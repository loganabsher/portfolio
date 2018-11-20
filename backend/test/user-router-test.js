'use strict';

const expect = require('chai').expect;
const superagent = require('superagent');

require('../server.js');

const User = require('../model/User.js');

const url = process.env.API_URL;

const testUser = {
  email: 'exampleuser@test.com',
  password: '123'
};

const newUser = {
  email: 'newuser@test.com',
  password: '321'
};

describe('user-router.js test', function(){
  describe('POST: /api/signup', () => {
    describe('with valid credentials', () => {
      // NOTE: I may want to manually add an additional feild to each POST of a user to make it easier and safer to target them while deleting
      afterEach((done) => {
        User.deleteOne({email: testUser.email})
          .then(() => done())
          .catch(done);
      });
      it('should return a status code of 200', (done) => {
        superagent.post(`${url}/api/signup`)
          .send(testUser)
          .end((err, res) => {
            if(err) return done(err);
            // console.log(res.body);
            expect(res.status).to.equal(200);
            done();
          });
      });
    });
  });

  describe('GET: /api/login', () => {
    describe('with valid credentials', () => {
      beforeEach((done) => {
        superagent.post(`${url}/api/signup`)
          .send(testUser)
          .then(() => done())
          .catch(done);
      });
      afterEach((done) => {
        User.deleteOne({email: testUser.email})
          .then(() => done())
          .catch(done);
      });
      it('should return a status code of 200', (done) => {
        superagent.get(`${url}/api/login`)
          .auth(testUser.email, testUser.password)
          .end((err, res) => {
            if(err) return done(err);
            // console.log(res.body);
            expect(res.status).to.equal(200);
            done();
          });
      });
    });
  });

  describe('GET: /api/allaccounts', () => {
    describe('with valid credentials', () => {
      beforeEach((done) => {
        // NOTE: I'm not sure if the .catch(done) is in the correct place, I'll fiddle with it later
        superagent.post(`${url}/api/signup`)
          .send(testUser)
          .then(() => {
            superagent.post(`${url}/api/signup`)
              .send(newUser)
              .then(() => done())
              .catch(done);
          });
      });
      afterEach((done) => {
        // NOTE: once test feild is added to test users, we can revert back to deleteMany here
        User.deleteOne({email: testUser.email})
          .then(() => User.deleteOne({email: newUser.email}))
          .then(() => done())
          .catch(done);
      });
      it('should return a status code of 200', (done) => {
        superagent.get(`${url}/api/allaccounts`)
          .end((err, res) => {
            if(err) return done(err);
            // console.log(res.body);
            expect(res.status).to.equal(200);
            done();
          });
      });
    });
  });

  describe('PUT: /api/updatepassword/:id', () => {
    describe('with valid credentials', () => {
      let tempUser = null;
      beforeEach((done) => {
        superagent.post(`${url}/api/signup`)
          .send(testUser)
          .then(() => done())
          .catch(done);
      });
      afterEach((done) => {
        User.deleteOne({email: testUser.email})
          .then(() => done())
          .catch(done);
      });
      it('should return a status code of 200', (done) => {
        console.log(tempUser._id);
        superagent.put(`${url}/api/updatepassword/${tempUser._id}`)
          .auth(testUser.email, testUser.password)
          .send(newUser.password)
          .end((err, res) => {
            if(err) return done(err);
            console.log(res.status);
            expect(res.status).to.equal(200);
            done();
          });
      });
    });
  });
});
