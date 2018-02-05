const router = require("express").Router();
const articlesRouter = require("./articles");
const commentsRouter = require("./comments");
const topicsRouter = require("./topics");
const usersRouter = require("./users");

// ## ROUTES
router.use("/articles", articlesRouter);
router.use("/comments", commentsRouter);
router.use("/topics", topicsRouter);
router.use("/users", usersRouter);

module.exports = router;
