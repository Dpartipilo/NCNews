if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';
//## Server
const express = require('express');
const app = express();

//##Database
const config = require('../config');
const db = config.DB[process.env.NODE_ENV] || process.env.DB;
const mongoose = require('mongoose');
mongoose.Promise = Promise;

//##API-Route
const apiRouter = require('../routes/api')

mongoose.connect(db, {useMongoClient: true})
  .then(() => console.log('successfully connected to', db))
  .catch(err => console.error('connection failed', err));

app.use('/api', apiRouter);

module.exports = app;