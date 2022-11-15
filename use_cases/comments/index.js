const Comment = require("../../database/models/comment");

const addComment = async (req) => {
  const newComment = {
    articles: req.params.articleId,
    body: req.body.body,
  };

  return await Comment.create(newComment);
};

const getComment = async (commentId) => {
  return await Comment.findById(commentId);
};

const updateComment = async (commentId, reqBody) => {
  return await Comment.findByIdAndUpdate(commentId, reqBody, {
    new: true,
    runValidators: true,
  });
};

const deleteComment = async (commentId) => {
  return await Comment.findByIdAndUpdate(
    commentId,
    {
      deletedAt: Date.now(),
    },
    {
      new: true,
      runValidators: true,
    }
  );
};

module.exports = {
  addComment,
  getComment,
  updateComment,
  deleteComment,
};
