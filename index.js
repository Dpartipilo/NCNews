const app = require("./server/server");
const PORT = require("./config").PORT[process.env.NODE_ENV];

app.listen(process.env.PORT || 3001);
