const catchAsync = require("../utils/catchAsync");
const commentDb = require("../use_cases/comments");

exports.addComment = catchAsync(async (req, res, next) => {
  const data = await commentDb.addComment(req);
  const response = {
    success: true,
    data,
  };

  res.status(201).json(response);
});

exports.getComment = catchAsync(async (req, res, next) => {
  const data = await commentDb.getComment(req.params.id);

  const response = {
    success: true,
    data,
  };

  res.status(200).json(response);
});

exports.updateComment = catchAsync(async (req, res, next) => {
  const data = await commentDb.updateComment(req.params.id, req.body);

  const response = {
    success: true,
    data,
  };

  res.status(201).json(response);
});

exports.deleteComment = catchAsync(async (req, res, next) => {
  const data = await commentDb.deleteComment(req.params.id);

  const response = {
    success: true,
    message: "Comment deleted successfully.",
    data,
  };

  res.status(200).json(response);
});
