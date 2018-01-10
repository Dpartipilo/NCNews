const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Hello from topics');
});

module.exports = router;