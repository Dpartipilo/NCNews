const { Articles, Users, Topics, Comments } = require('../models/models');
const DBs = require('../config').DB;
const mongoose = require('mongoose');
mongoose.Promise = Promise;

const savedData = {};

mongoose.connect(DBs.test, { useMongoClient: true });
mongoose.connection.dropDatabase()

function saveArticles() {
  const articles = [
    { title: 'Cats are great', body: 'something', from_topic: 'cats' },
    { title: 'Football is fun', body: 'something', from_topic: 'football' }
  ].map(a => new Articles(a).save((err) => {
    if (err) console.log(err)
  }));
  return Promise.all(articles);
}

function saveComments(articles) {
  const comments = [
    { body: 'this is a comment', from_topic: articles[0]._id, created_by: 'northcoder' },
    { body: 'this is another comment', from_topic: articles[0]._id, created_by: 'northcoder' }
  ].map(c => new Comments(c).save());
  return Promise.all(comments);
}

function saveTopics() {
  const topics = [
    { title: 'Football', slug: 'football' },
    { title: 'Cooking', slug: 'cooking' },
    { title: 'Cats', slug: 'cats' }
  ].map(t => new Topics(t).save());
  return Promise.all(topics);
}

function saveUser() {
  const user = new Users({
    username: 'northcoder',
    name: 'Awesome Northcoder',
    avatar_url: 'https://avatars3.githubusercontent.com/u/6791502?v=3&s=200'
  });
  return user.save();
}

function saveTestData() {
  return saveUser()
    .then((user) => {
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
    .then((comments) => {
      savedData.comments = comments;
      return savedData;
    }).then((user, topics, articles, comments)=>{
      console.log(user)
      mongoose.disconnect();
    })
    .catch((err) => {
      if (err) console.log(err)
    });
}

saveTestData()

module.exports = saveTestData;