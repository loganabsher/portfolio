'use strict';

const expect = require('chai').expect;
const superagent = require('superagent');
const Promise = require('bluebird');

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
    afterEach(() => User.deleteOne({'email': testUser.email}));

    it('should return a status code of 200', () => {
      superagent.post(`${url}/api/signup`)
        .send(testUser)
        .then((res) => res.status.should.eventually.equal(200));
    });
  });
});

describe('GET: /api/login', () => {
  describe('with valid credentials', () => {
    beforeEach(() => {
      return superagent.post(`${url}/api/signup`)
        .send(testUser)
        .then((res) => res)
        .catch((err) => err);
    });
    afterEach(() => User.deleteOne({email: testUser.email}));

    it('should return a status code of 200', () => {
      superagent.get(`${url}/api/login`)
        .auth(testUser.email, testUser.password)
        .then((res) => res.status.should.eventually.equal(200));
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
        .then((res) => res.status.should.eventually.equal(200));
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
        .then((res) => res.status.should.eventually.equal(204));
    });
  });
});
