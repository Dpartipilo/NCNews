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
      }).catch(err => console.log({ 'error': + err }));// eslint-disable-line no-console
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
        .get(`/api/topics/${usefulData.topics[0].slug}/articles`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(1);
          expect(res.body[0].title).to.be.a('string');
        });
    });
    it('Returns a 404 error if a topic that doesn\'t exist is given', () => {
      return request
        .get('/api/topics/test/articles')
        .expect(404)
        .then(res => {
          expect(res.body.message).to.equal('This topic doesn\'t exist');
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

  describe('GET /articles/article_id', () => {
    it('Return an specific article by id with a status code of 200', () => {
      return request
        .get(`/api/articles/${usefulData.articles[0]._id}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.title).to.be.a('string');
        });
    });
    it('Returns a 404 error if an article id is not found', () => {
      return request
        .get('/api/aricles/errorTest')
        .expect(404)
        .then(res => {
          expect(res.body.message).to.eql('Page not found');
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
    it('Returns a status 404 if an article id is not found', () => {
      return request
        .get('/api/aricles/errorTest/comments')
        .expect(404)
        .then(res => {
          expect(res.body.message).to.eql('Page not found');
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
          expect(res.body.created_by).to.equal('northcoder');
        });
    });
    it('Returns a 400 status code if posting an invalid comment', () => {
      return request
        .post(`/api/articles/${usefulData.articles[0]._id}/comments`)
        .send({
          body: '  '
        })
        .expect(400)
        .then(res => {
          expect(res.body.message).to.equal('INVALID INPUT');
        });
    });
    it('Returns a 400 status code if posting with no comment', () => {
      return request
        .post(`/api/articles/${usefulData.articles[0]._id}/comments`)
        .send({})
        .expect(400)
        .then(res => {
          expect(res.body.message).to.equal('INVALID INPUT');
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
          const { votes } = res.body.article;
          expect(res.body).to.be.an('object');
          expect(votes).to.equal(1);
          expect(votes).to.be.a('number');
        });
    });
    it('Returns with a status code of 404 if the article_id is not found', () => {
      return request
        .put('/api/articles/wrongId?vote=up')
        .expect(404)
        .then(res => {
          expect(res.body.message).to.equal('ARTICLE_ID NOT FOUND');
        });
    });
    it('Returns with a status code of 400 for a non valid vote', () => {
      return request
        .put(`/api/articles/${usefulData.articles[0]._id}?vote=wrongQuery`)
        .expect(400);
    });
  });

  //PUT decrement the votes of an article by 1
  describe('PUT /api/articles/:article_id?vote=down', () => {
    it('Responds with ARTICLE votes -1  with a status code of 202', () => {
      return request
        .put(`/api/articles/${usefulData.articles[0]._id}?vote=down`)
        .expect(202)
        .then(res => {
          const { votes } = res.body.article;
          expect(res.body).to.be.an('object');
          expect(votes).to.equal(-1);
          expect(votes).to.be.a('number');
        });
    });
    it('Returns with a status code of 404 if the article_id is not found', () => {
      return request
        .put('/api/articles/test?vote=down')
        .expect(404)
        .then(res => {
          expect(res.body.message).to.equal('ARTICLE_ID NOT FOUND');
        });
    });
    it('Returns with a status code of 400 for a non valid vote', () => {
      return request
        .put(`/api/articles/${usefulData.articles[0]._id}?vote=wrongQuery`)
        .expect(400);
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

  //GET user by username
  describe('GET /api/users/:username', () => {
    it('Returns an object with the profile data for the specified user', () => {
      return request
        .get(`/api/users/${usefulData.user.username}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.username).to.be.a('string');
          expect(res.body.username).to.equal('northcoder');
          expect(res.body.name).to.equal('Awesome Northcoder');
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

  //DELETE deletes a comment
  describe('DELETE /api/comments/:comment_id', () => {
    it('Deletes a COMMENT and responds with a status code of 202', () => {
      return request
        .delete(`/api/comments/${usefulData.comments[0]._id}`)
        .expect(202)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.be.a('string');
        });
    });
  });
  /**************** ERROR ****************/

});
