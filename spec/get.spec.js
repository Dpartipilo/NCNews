process.env.NODE_ENV = "test";
const { expect } = require("chai");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../server/server");
const request = supertest(app);
const saveTestData = require("../seed/test.seed.js");

describe("GET requests", () => {
  let usefulData;
  before(() => {
    return mongoose.connection
      .dropDatabase()
      .then(saveTestData)
      .then(data => {
        usefulData = data;
      })
      .catch(err => console.log({ error: +err })); // eslint-disable-line no-console
  });

  /**************** TOPICS ***************/

  describe("GET /topics", () => {
    it("Returns all TOPICS with a status code of 200", () => {
      return request
        .get("/api/topics")
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an("array");
          expect(res.body.length).to.be.equal(3);
          expect(res.body[0].title).to.be.a("string");
        });
    });
  });

  describe("GET /api/topics/:topic_id/articles", () => {
    it("Returns all ARTICLES from a TOPIC with a status code of 200", () => {
      return request
        .get(`/api/topics/${usefulData.topics[0].slug}/articles`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an("array");
          expect(res.body.length).to.equal(1);
          expect(res.body[0].title).to.be.a("string");
        });
    });
    it("Returns a 404 status code if a topic id that doesn't exist is given", () => {
      return request
        .get("/api/topics/coding/articles")
        .expect(404)
        .then(res => {
          expect(res.body.message).to.equal("TOPIC NOT FOUND");
        });
    });
  });

  /*************** ARTICLES **************/

  describe("GET /articles", () => {
    it("Returns all ARTICLES with a status code of 200", () => {
      return request
        .get("/api/articles")
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an("array");
          expect(res.body.length).to.equal(2);
          expect(res.body[0].title).to.be.a("string");
        });
    });
  });

  describe("GET /articles/article_id", () => {
    it("Return an specific article by id with a status code of 200", () => {
      return request
        .get(`/api/articles/${usefulData.articles[0]._id}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an("object");
          expect(res.body.title).to.be.a("string");
        });
    });
    it("Returns a 404 status if an article is not found", () => {
      return request
        .get("/api/articles/5a622537ab7deb0bd909beb5")
        .expect(404)
        .then(res => {
          expect(res.body.message).to.eql("ARTICLE_ID NOT FOUND");
        });
    });
    it('Returns a 400 status "Bad request" if an article id is not valid', () => {
      return request.get("/api/articles/wrongIdTest").expect(400);
    });
  });

  describe("GET /api/articles/:article_id/comments", () => {
    it("Returns all COMMENTS from an ARTICLE with a status code of 200", () => {
      return request
        .get(`/api/articles/${usefulData.articles[0]._id}/comments`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an("array");
          expect(res.body.length).to.equal(2);
          expect(res.body[0].body).to.be.a("string");
        });
    });
    it("Returns a status 404 if an article id is not found", () => {
      return request
        .get("/api/articles/5a622537ab7deb0bd909beb5/comments")
        .expect(404)
        .then(res => {
          expect(res.body.message).to.eql("ARTICLE_ID NOT FOUND");
        });
    });
    it('Returns a 400 status "Bad request" if an article id is not valid', () => {
      return request.get("/api/articles/wrongIdTest").expect(400);
    });
  });

  /**************** USERS ****************/

  describe("GET /api/users", () => {
    it("Returns all users with a status code of 200", () => {
      return request
        .get("/api/users")
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an("array");
          expect(res.body.length).to.equal(1);
          expect(res.body[0].username).to.be.a("string");
        });
    });
  });

  describe("GET /api/users/:username", () => {
    it("Returns an object with the profile data for the specified user", () => {
      return request
        .get(`/api/users/${usefulData.user.username}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an("object");
          expect(res.body.username).to.be.a("string");
          expect(res.body.username).to.equal("northcoder");
          expect(res.body.name).to.equal("Awesome Northcoder");
        });
    });
    it("Returns a 404 status code if the user doesn't exist", () => {
      return request
        .get("/api/users/Diego")
        .expect(404)
        .then(res => {
          expect(res.body.message).to.equal("USERNAME NOT FOUND");
        });
    });
  });
});
