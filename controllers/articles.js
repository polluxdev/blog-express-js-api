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
  const query = { ...req.query };
  const data = await articleDb.getArticles(query);

  const response = {
    success: true,
    count: data.data.length,
    ...data,
  };

  res.status(200).json(response);
});

exports.updateArticle = catchAsync(async (req, res, next) => {
  const data = await articleDb.updateArticle(req.params.id, req.body);

  const response = {
    success: true,
    data,
  };

  res.status(201).json(response);
});

exports.deleteArticle = catchAsync(async (req, res, next) => {
  const data = await articleDb.deleteArticle(req.params.id);

  const response = {
    success: true,
    message: "Article deleted successfully.",
    data,
  };

  res.status(200).json(response);
});
