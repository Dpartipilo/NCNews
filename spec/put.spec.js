process.env.NODE_ENV = "test";
const { expect } = require("chai");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../server/server");
const request = supertest(app);
const saveTestData = require("../seed/test.seed.js");

describe("PUT requests", () => {
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
  after(() => {
    mongoose.disconnect();
  });

  /*************** ARTICLES **************/

  describe("PUT /api/articles/:article_id?vote=up", () => {
    it("Responds with ARTICLE votes +1 with a status code of 202", () => {
      return request
        .put(`/api/articles/${usefulData.articles[0]._id}?vote=up`)
        .expect(202)
        .then(res => {
          const { votes } = res.body.article;
          expect(res.body).to.be.an("object");
          expect(votes).to.equal(1);
          expect(votes).to.be.a("number");
        });
    });
    it("Returns with a status code of 404 if the article_id is not found", () => {
      return request
        .put("/api/articles/5a622537ab7deb0bd909beb0?vote=up")
        .expect(404)
        .then(res => {
          expect(res.body.message).to.equal("ARTICLE_ID NOT FOUND");
        });
    });
    it("Returns with a status code of 400 for a non valid vote", () => {
      return request
        .put(`/api/articles/${usefulData.articles[0]._id}?vote=wrongQuery`)
        .expect(400);
    });
  });

  describe("PUT /api/articles/:article_id?vote=down", () => {
    it("Responds with ARTICLE votes -1  with a status code of 202", () => {
      return request
        .put(`/api/articles/${usefulData.articles[0]._id}?vote=down`)
        .expect(202)
        .then(res => {
          const { votes } = res.body.article;
          expect(res.body).to.be.an("object");
          expect(votes).to.equal(-1);
          expect(votes).to.be.a("number");
        });
    });
    it("Returns with a status code of 404 if the article_id is not found", () => {
      return request
        .put("/api/articles/wrongId?vote=down")
        .expect(404)
        .then(res => {
          expect(res.body.message).to.equal("ARTICLE_ID NOT FOUND");
        });
    });
    it("Returns with a status code of 400 for a non valid vote", () => {
      return request
        .put(`/api/articles/${usefulData.articles[0]._id}?vote=wrongQuery`)
        .expect(400);
    });
  });

  /**************** COMMENTS ****************/

  describe("PUT /api/comments/:comment_id?vote=up", () => {
    it("Responds with COMMENT votes +1  with a status code of 202", () => {
      return request
        .put(`/api/comments/${usefulData.comments[0]._id}?vote=up`)
        .expect(202)
        .then(res => {
          expect(res.body).to.be.an("object");
          expect(res.body.comment.votes).to.equal(1);
          expect(res.body.comment.votes).to.be.a("number");
        });
    });
    it("Returns with a status code of 404 if the comment_id is not found", () => {
      return request
        .put("/api/comments/wrongId?vote=up")
        .expect(404)
        .then(res => {
          expect(res.body.message).to.equal("COMMENT_ID NOT FOUND");
        });
    });
    it("Returns with a status code of 400 for a non valid vote", () => {
      return request
        .put(`/api/comments/${usefulData.comments[0]._id}?vote=wrongQuery`)
        .expect(400);
    });
  });

  describe("PUT /api/comments/:comment_id?vote=down", () => {
    it("Responds with COMMENT votes -1  with a status code of 202", () => {
      return request
        .put(`/api/comments/${usefulData.comments[0]._id}?vote=down`)
        .expect(202)
        .then(res => {
          expect(res.body).to.be.an("object");
          expect(res.body.comment.votes).to.equal(-1);
          expect(res.body.comment.votes).to.be.a("number");
        });
    });
    it("Returns with a status code of 404 if the comment_id is not found", () => {
      return request
        .put("/api/comments/wrongId?vote=down")
        .expect(404)
        .then(res => {
          expect(res.body.message).to.equal("COMMENT_ID NOT FOUND");
        });
    });
    it("Returns with a status code of 400 for a non valid vote", () => {
      return request
        .put(`/api/comments/${usefulData.comments[0]._id}?vote=wrongQuery`)
        .expect(400);
    });
  });
});
