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
  after(() => {
    mongoose.disconnect();
  });

  /**************** TOPICS ***************/

  //Get all topics
  describe('GET /topics', () => {
    it('Returns all TOPICS with a status code of 200', () => {
      return request
        .get('/api/topics')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.be.equal(3);
          expect(res.body[0].title).to.be.a('string');
        });
    });
  });

  //Get all articles by topic
  describe('GET /api/topics/:topic_id/articles', () => {
    it('Returns all ARTICLES from a TOPIC with a status code of 200', () => {
      return request
        .get(`/api/topics/${usefulData.topics[0]._id}/articles`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(2);
          expect(res.body[0].title).to.be.a('string');
        });
    });
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

  //All comments from an article
  describe('GET /api/articles/:article_id/comments', () => {
    it('Returns all COMMENTS from an ARTICLE with a status code of 200', () => {
      return request
        .get(`/api/articles/${usefulData.articles[0]._id}/comments`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(2);
          expect(res.body[0].body).to.be.a('string');
        });
    });
  });

});

