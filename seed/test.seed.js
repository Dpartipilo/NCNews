const {
  ArticleSchema,
  UserSchema,
  TopicSchema,
  CommentSchema
} = require("../models");

const savedData = {};

function saveUser() {
  const user = new UserSchema({
    username: "northcoder",
    name: "Awesome Northcoder",
    avatar_url: "https://avatars3.githubusercontent.com/u/6791502?v=3&s=200"
  });
  return user.save();
}

function saveTopics() {
  const topics = [
    { title: "Football", slug: "football" },
    { title: "Cooking", slug: "cooking" },
    { title: "Cats", slug: "cats" }
  ].map(t => new TopicSchema(t).save());
  return Promise.all(topics);
}

function saveArticles() {
  const articles = [
    { title: "Cats are great", body: "something", from_topic: "cats" },
    { title: "Football is fun", body: "something", from_topic: "football" }
  ].map(a => new ArticleSchema(a).save());
  return Promise.all(articles);
}

function saveComments(articles) {
  const comments = [
    {
      body: "this is a comment",
      from_topic: articles[0]._id,
      created_by: "northcoder"
    },
    {
      body: "this is another comment",
      from_topic: articles[0]._id,
      created_by: "northcoder"
    }
  ].map(c => new CommentSchema(c).save());
  return Promise.all(comments);
}

function saveTestData() {
  return saveUser()
    .then(user => {
      savedData.user = user;
      return saveTopics();
    })
    .then(topics => {
      savedData.topics = topics;
      return saveArticles();
    })
    .then(articles => {
      savedData.articles = articles;
      return saveComments(articles);
    })
    .then(comments => {
      savedData.comments = comments;
      return savedData;
    })
    .catch(err => {
      if (err) console.error(err); // eslint-disable-line no-console
    });
}

module.exports = saveTestData;
