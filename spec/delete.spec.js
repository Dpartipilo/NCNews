process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../server/server');
const request = supertest(app);
const saveTestData = require('../seed/test.seed.js');

describe('DELETE request', () => {
  let usefulData;
  before(() => {
    return mongoose.connection.dropDatabase()
      .then(saveTestData)
      .then((data) => {
        usefulData = data;
        // console.log(usefulData);
      }).catch(err => console.log({ 'error': + err }));// eslint-disable-line no-console
  });

  /**************** COMMENTS ****************/

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
});
