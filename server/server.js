/*eslint-disable no-console*/
if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';
if (process.env.NODE_ENV !== 'production') require('dotenv').config({
  path: `./.${process.env.NODE_ENV}.env`
});

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

const app = express();
const apiRouter = require('../routes/api');

mongoose.connect(process.env.DB_URI, { useMongoClient: true })
  .then(() => console.log(`successfully connected to "${process.env.NODE_ENV}" database`))
  .catch(err => console.error('connection failed', err));

app.use(bodyParser.json());
app.use(cors());

app.use('/api', apiRouter);

app.use('/*', (req, res) => {
  res.status(404).send({ message: 'Page not found' });
});

app.use((err, req, res, next) => {
  if(err.status === 404) return res.status(404).send({message: err.message});
  if(err.status === 400) return res.status(400).send({message: err.message});
  else return next(err);
});
app.use((err, req, res) => {
  res.status(500).send({err});
});

module.exports = app;