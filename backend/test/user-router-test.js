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
        .then(() => done)
        .catch((err) => done(err));
    });

    console.log(`${url}/api/signup`);
    it('should return a status code of 200', (done) => {
      superagent.post(`${url}/api/signup`)
        .send(testUser)
        .end((res, err) => {
          if(err) return done(err);
          expect(res).to.be.an('object');
          expect(res.status).to.equal(200);
        })
        .catch((err) => console.error(err));
    });
  });
});

describe('GET: /api/login', () => {
  describe('with valid credentials', () => {
    beforeEach(() => {
      return superagent.post(`${url}/api/signup`)
        .send(testUser);
    });
    afterEach(() => User.deleteOne({email: testUser.email}));

    it('should return a status code of 200', () => {
      superagent.get(`${url}/api/login`)
        .auth(testUser.email, testUser.password)
        .then((res) => {
          console.log(res);
          expect(res).to.be.an('object');
          expect(res.status).to.equal(200);
        })
        .catch((err) => console.error(err));
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
        .then((res) => expect(res.status).to.eventually.equal(200))
        .catch((err) => console.error(err));
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
    it('should return a status code of 204', () => {
      superagent.delete(`${url}/api/deleteaccount`)
        .auth(testUser.email, testUser.password)
        .end((err, res) => {
          if(err) return err;
          expect(res.status).to.eventually.equal(204);
        });
        // .catch((err) => console.error(err));
    });
  });
});
