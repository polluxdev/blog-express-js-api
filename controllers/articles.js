const config = require("../config");
const AppError = require("../utils/appError");

const catchAsync = require("../utils/catchAsync");
const articleDb = require("../use_cases/articles");

exports.addArticle = catchAsync(async (req, res, next) => {
  const reqBody = req.body;
  const data = await articleDb.addArticle(reqBody);
  const response = {
    success: true,
    data,
  };

  res.status(201).json(response);
});

exports.getArticles = catchAsync(async (req, res, next) => {
  const {
    page = 1,
    limit = config.query.QUERY_LIMIT,
    ...fields
  } = { ...req.query };

  let skip;
  if (page == 1) {
    skip = 0;
  } else {
    skip = Math.max(0, page);
  }

  const data = await articleDb.getArticles({ skip, limit, fields });

  const response = {
    success: true,
    count: data.length,
    page: parseInt(page),
    perPage: parseInt(limit),
    data,
  };

  res.status(200).json(response);
});

exports.updateArticle = catchAsync(async (req, res, next) => {
  const article = await articleDb.checkArticle(req.params.id);
  if (!article) {
    throw new AppError("Article not found.", 404);
  }

  const data = await articleDb.updateArticle(req.params.id, req.body);

  const response = {
    success: true,
    data,
  };

  res.status(201).json(response);
});

exports.deleteArticle = catchAsync(async (req, res, next) => {
  const article = await articleDb.checkArticle(req.params.id);
  if (!article) {
    throw new AppError("Article not found.", 404);
  }

  const data = await articleDb.deleteArticle(req.params.id);

  const response = {
    success: true,
    message: "Article deleted successfully.",
    data,
  };

  res.status(200).json(response);
});
