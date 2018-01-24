process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../server/server');
const request = supertest(app);
const saveTestData = require('../seed/test.seed.js');

describe('DELETE request', () => {
  let usefulData;
  beforeEach(() => {
    return mongoose.connection.dropDatabase()
      .then(saveTestData)
      .then((data) => {
        usefulData = data;
      }).catch(err => console.log({ 'error': + err }));// eslint-disable-line no-console
  });

  /**************** COMMENTS ****************/

  //DELETE deletes a comment
  describe('DELETE /api/comments/:comment_id', () => {
    it('Deletes a COMMENT and responds with a status code of 204', () => {
      return request
        .delete(`/api/comments/${usefulData.comments[0]._id}`)
        .expect(204);
    });
    it('Returns a 404 status code if the comment id is not found', () => {
      return request
        .delete(`/api/comments/${usefulData.comments[0]._id}`)
        .expect(204)
        .then(() => {
          return request
            .delete(`/api/comments/${usefulData.comments[0]._id}`)
            .expect(404)
            .then(res => {
              expect(res.body.message).to.equal('COMMENT_ID NOT FOUND');
            });
        });
    });
    it('Returns a 400 status "Bad request" if a comment id is not valid', () => {
      return request
        .delete('/api/comments/wrongId')
        .expect(400);
    });
  });
});
