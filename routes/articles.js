const router = require("express").Router();
const {
  getArticleById,
  getAllArticles,
  getAllCommentsByArticle,
  addCommentsToArticle,
  articleVote
} = require("../controllers/articlesControler");

router.get("/", getAllArticles);

router
  .route("/:article_id")
  .get(getArticleById)
  .put(articleVote);

router
  .route("/:article_id/comments")
  .get(getAllCommentsByArticle)
  .post(addCommentsToArticle);

module.exports = router;
