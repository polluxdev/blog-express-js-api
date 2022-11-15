const express = require("express");

const articlesController = require("../controllers/articles");
const { articleValidationRules, validate } = require("../validators/article");

const router = express.Router();

router.post(
  "/articles",
  articleValidationRules(),
  validate,
  articlesController.addArticle
);
router.get("/articles", articlesController.getArticles);
router.put("/articles/:id", articlesController.updateArticle);
router.delete("/articles/:id", articlesController.deleteArticle);

module.exports = router;
