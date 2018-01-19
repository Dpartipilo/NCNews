/*eslint-disable no-console*/
if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';
require('dotenv').config({
  path: `./.${process.env.NODE_ENV}.env`
});

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
process.env.NODE_ENV;
const mongoose = require('mongoose');
mongoose.Promise = Promise;

const apiRouter = require('../routes/api');

mongoose.connect(process.env.DB_URI, { useMongoClient: true })
  .then(() => console.log(`successfully connected to "${process.env.NODE_ENV}" database`))
  .catch(err => console.error('connection failed', err));

app.use(bodyParser.json());

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