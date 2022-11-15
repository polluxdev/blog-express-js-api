const express = require("express");

const commentsController = require("../controllers/comments");
const { commentValidationRules, validate } = require("../validators/comment");

const router = express.Router();

router.post(
  "/articles/:articleId/comments",
  commentValidationRules(),
  validate,
  commentsController.addComment
);
router.get("/articles/:articleId/comments/:id", commentsController.getComment);
router.put(
  "/articles/:articleId/comments/:id",
  commentsController.updateComment
);
router.delete(
  "/articles/:articleId/comments/:id",
  commentsController.deleteComment
);

module.exports = router;
