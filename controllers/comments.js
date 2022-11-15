const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const commentDb = require("../use_cases/comments");
const articleDb = require("../use_cases/articles");

exports.addComment = catchAsync(async (req, res, next) => {
  const article = await articleDb.checkArticle(req.params.articleId);
  if (!article) {
    throw new AppError("Article not found.", 404);
  }

  const data = await commentDb.addComment(req);
  const response = {
    success: true,
    data,
  };

  res.status(201).json(response);
});

exports.getComment = catchAsync(async (req, res, next) => {
  const article = await articleDb.checkArticle(req.params.articleId);
  if (!article) {
    throw new AppError("Article not found.", 404);
  }

  const comment = await commentDb.checkComment(req.params.id);
  if (!comment) {
    throw new AppError("Comment not found.", 404);
  }

  const data = await commentDb.getComment(req.params.id);

  const response = {
    success: true,
    data,
  };

  res.status(200).json(response);
});

exports.updateComment = catchAsync(async (req, res, next) => {
  const article = await articleDb.checkArticle(req.params.articleId);
  if (!article) {
    throw new AppError("Article not found.", 404);
  }

  const comment = await commentDb.checkComment(req.params.id);
  if (!comment) {
    throw new AppError("Comment not found.", 404);
  }

  const data = await commentDb.updateComment(req.params.id, req.body);

  const response = {
    success: true,
    data,
  };

  res.status(201).json(response);
});

exports.deleteComment = catchAsync(async (req, res, next) => {
  const article = await articleDb.checkArticle(req.params.articleId);
  if (!article) {
    throw new AppError("Article not found.", 404);
  }

  const comment = await commentDb.checkComment(req.params.id);
  if (!comment) {
    throw new AppError("Comment not found.", 404);
  }

  const data = await commentDb.deleteComment(req.params.id);

  const response = {
    success: true,
    message: "Comment deleted successfully.",
    data,
  };

  res.status(200).json(response);
});
