process.env.NODE_ENV = "test";
const { expect } = require("chai");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../server/server");
const request = supertest(app);
const saveTestData = require("../seed/test.seed.js");

describe("POST requests", () => {
  let usefulData;
  beforeEach(() => {
    return mongoose.connection
      .dropDatabase()
      .then(saveTestData)
      .then(data => {
        usefulData = data;
      })
      .catch(err => console.log({ error: +err })); // eslint-disable-line no-console
  });

  /*************** ARTICLES **************/

  describe("POST /api/articles/:article_id/comments", () => {
    it("Responds with the new added COMMENT to an ARTICLE with a status code of 201", () => {
      return request
        .post(`/api/articles/${usefulData.articles[0]._id}/comments`)
        .send({
          from_topic: `${usefulData.articles[0]._id}`,
          body: "test comment!",
          created_by: "northcoder"
        })
        .expect(201)
        .then(res => {
          expect(res.body).to.be.an("object");
          expect(res.body.body).to.equal("test comment!");
          expect(res.body.created_by).to.equal("northcoder");
        });
    });
    it("Returns a 400 status code if posting an invalid comment", () => {
      return request
        .post(`/api/articles/${usefulData.articles[0]._id}/comments`)
        .send({
          body: "  "
        })
        .expect(400)
        .then(res => {
          expect(res.body.message).to.equal("INVALID INPUT");
        });
    });
    it("Returns a 400 status code if posting an empty comment", () => {
      return request
        .post(`/api/articles/${usefulData.articles[0]._id}/comments`)
        .send({})
        .expect(400)
        .then(res => {
          expect(res.body.message).to.equal("INVALID INPUT");
        });
    });
  });
});
