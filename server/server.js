if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';
const express = require('express');
const app = express();
const apiRouter = require('../routes/api')

app.use('/api', apiRouter);

module.exports = app;