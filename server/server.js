if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';
const express = require('express');
const app = express();
const apiRouter = require('../routes/api')

app.use('/api', apiRouter);



// app.get('/', function (req, res) {
//   res.send('Hello World from port 3000')
// })

// app.listen(3000)

module.exports = app;