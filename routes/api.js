const express = require('express')
const app = express();
const router = require('express').Router()
const articlesRouter = require('./articles');
const commentsRouter = require('./comments');

router.get('/', (req, res) => {
  res.send('Hello World ')
})

router.use('/articles', articlesRouter);
router.use('/comments', commentsRouter);


module.exports = router;