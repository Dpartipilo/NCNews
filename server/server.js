if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';
//## Server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//##Database
const config = require('../config');
const db = config.DB[process.env.NODE_ENV] || process.env.DB;
const mongoose = require('mongoose');
mongoose.Promise = Promise;

app.use(bodyParser.json());

//##API-Route
const apiRouter = require('../routes/api');

mongoose.connect(db, {useMongoClient: true})
  .then(() => console.log('successfully connected to', db))
  .catch(err => console.error('connection failed', err));

app.use('/api', apiRouter);

app.use((err, req, res, next) => {
  if(err.type === 400) res.status(400).send(err, {msg: 'invalid id'});
  else(next(err));
});

app.use((err, req, res, next) => {
  if(err.type === 404) res.status(404).send(err, {msg: 'page not found'});
  else(next(err));
});

app.use((err, req, res, next) => res.status(500).send({err}));


module.exports = app;