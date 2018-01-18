if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';
require('dotenv').config({
  path: `./.${process.env.NODE_ENV}.env`
});

//## Server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
process.env.NODE_ENV;
//##Database

const mongoose = require('mongoose');
mongoose.Promise = Promise;

app.use(bodyParser.json());

//##API-Route
const apiRouter = require('../routes/api');

mongoose.connect(process.env.DB_URI, { useMongoClient: true })
  .then(() => console.log('successfully connected to the database'))// eslint-disable-line no-console
  .catch(err => console.error('connection failed', err));// eslint-disable-line no-console

app.use('/api', apiRouter);

app.use((err, req, res, next) => {
  if (err.type === 400) res.status(400).send(err, { msg: 'invalid id' });
  else (next(err));
});

app.use((err, req, res, next) => {
  if (err.type === 404) res.status(404).send(err, { msg: 'page not found' });
  else (next(err));
});

app.use((err, req, res) => res.status(500).send({ err }));


module.exports = app;