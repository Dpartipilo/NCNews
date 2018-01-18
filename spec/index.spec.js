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
        // console.log(usefulData);
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

  //Get all articles
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

  //Get all comments from an article
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

  // POST add a commment to an article
  describe('POST /api/articles/:article_id/comments', () => {
    it('Responds with the new added COMMENT to an ARTICLE with a status code of 201', () => {
      return request
        .post(`/api/articles/${usefulData.articles[0]._id}/comments`)
        .send({
          from_topic: `${usefulData.articles[0]._id}`,
          body: 'test comment!',
          created_by: 'northcoder'
        })
        .expect(201)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.body).to.equal('test comment!');
          expect(res.body.body).to.be.a('string');
        });
    });
  });

  //PUT increment the votes of an article by 1
  describe('PUT /api/articles/:article_id?vote=up', () => {
    it('Responds with ARTICLE votes +1 with a status code of 202', () => {
      return request
        .put(`/api/articles/${usefulData.articles[0]._id}?vote=up`)
        .expect(202)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.article.votes).to.equal(1);
          expect(res.body.article.votes).to.be.a('number');
        });
    });
  });

  //PUT decrement the votes of an article by 1
  describe('PUT /api/articles/:article_id?vote=down', () => {
    it('Responds with ARTICLE votes -1  with a status code of 202', () => {
      return request
        .put(`/api/articles/${usefulData.articles[0]._id}?vote=down`)
        .expect(202)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.article.votes).to.equal(-1);
          expect(res.body.article.votes).to.be.a('number');
        });
    });
  });

  /**************** USERS ****************/

  //GET all users
  describe('GET /api/users', () => {
    it('Returns all users with a status code of 200', () => {
      return request
        .get('/api/users')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(1);
          expect(res.body[0].username).to.be.a('string');
        });
    });
  });

  /**************** COMMENTS ****************/

  // PUT increment votes by 1
  describe('PUT /api/comments/:comment_id?vote=up', () => {
    it('Responds with COMMENT votes +1  with a status code of 202', () => {
      return request
        .put(`/api/comments/${usefulData.comments[0]._id}?vote=up`)
        .expect(202)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.comment.votes).to.equal(1);
          expect(res.body.comment.votes).to.be.a('number');
        });
    });
  });

  //PUT DECREMENTS the votes of an comment by 1
  describe('PUT /api/comments/:comment_id?vote=down', () => {
    it('Responds with COMMENT votes -1  with a status code of 202', () => {
      return request
        .put(`/api/comments/${usefulData.comments[0]._id}?vote=down`)
        .expect(202)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.comment.votes).to.equal(-1);
          expect(res.body.comment.votes).to.be.a('number');
        });
    });
  });
});

