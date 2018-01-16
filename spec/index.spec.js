process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../server/server');
const request = supertest(app);
const saveTestData = require('../seed/test.seed.js');

describe('API', () => {
  let usefulData;
  beforeEach(() => {
    return mongoose.connection.dropDatabase()
      .then(saveTestData)
      .then((data) => {
        usefulData = data;
        // console.log(usefulData)
      }).catch(err => console.log({ 'error': + err }));
  });

  /*************** ARTICLES **************/

  // Get all articles
  describe('GET /articles', () => {
    it('Returns all ARTICLES with a status code of 200', () => {
      return request
        .get('/api/articles')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(2);
          expect(res.body[0].title).to.be.a('string');
        });

    });
  });
});