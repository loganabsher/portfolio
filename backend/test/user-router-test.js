'use strict';

const chai = require('chai');
const expect = chai.expect;
const superagent = require('superagent');
const Promise = require('bluebird');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

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

describe('POST: /api/signup', () => {
  describe('with valid credentials', () => {
    afterEach((done) => {
      User.deleteOne({'email': testUser.email})
        .then(() => done())
        .catch((err) => done(err));
    });

    it('should return a status code of 200', (done) => {
      superagent.post(`${url}/api/signup`)
        .send(testUser)
        .end((err, res) => {
          if(err) return done(err);
          expect(res).to.be.an('object');
          expect(res.status).to.equal(200);
        })
        .then(() => done());
    });
  });
});

describe('GET: /api/login', () => {
  describe('with valid credentials', () => {
    beforeEach((done) => {
      return superagent.post(`${url}/api/signup`)
        .send(testUser)
        .then(() => done())
        .catch((err) => done(err));
    });
    afterEach(() => User.deleteOne({email: testUser.email}));

    it('should return a status code of 200', (done) => {
      superagent.get(`${url}/api/login`)
        .auth(testUser.email, testUser.password)
        .then((res) => {
          expect(res).to.be.an('object');
          expect(res.status).to.equal(200);
          done();
        })
        .then((done) => done());
    });
  });
});


describe('PUT: /api/updatepassword', () => {
  describe('with valid credentials', () => {
    beforeEach(() => {
      return superagent.post(`${url}/api/signup`)
        .send(testUser)
        .then((res) => res)
        .catch((err) => err);
    });
    afterEach(() => User.deleteOne({email: testUser.email}));

    it('should return a status code of 200', () => {
      superagent.put(`${url}/api/updatepassword`)
        .auth(testUser.email, testUser.password)
        .send(newUser.password)
        .then((res) => expect(Promise.resolve(res.status).to.eventually.equal(200)));
    });
  });
});

describe('DELETE: /api/deleteaccount', () => {
  describe('with valid credentials', () => {
    beforeEach(() => {
      return superagent.post(`${url}/api/signup`)
        .send(testUser)
        .then((res) => res)
        .catch((err) => err);
    });
    it('should return a status code of 200', () => {
      superagent.delete(`${url}/api/deleteaccount`)
        .auth(testUser.email, testUser.password)
        .then((res) => expect(Promise.resolve(res.status).to.eventually.equal(204)));
    });
  });
});
