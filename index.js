const app = require('./server/server');
const PORT = require('./config').PORT[process.env.NODE_ENV];

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});