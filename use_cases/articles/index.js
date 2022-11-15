const config = require("../../config");

const Article = require("../../database/models/article");

const addArticle = async (reqBody) => {
  const newArticle = {
    title: reqBody.title,
    body: reqBody.body,
  };

  return await Article.create(newArticle);
};

const getArticles = async (queryString) => {
  const { page = 1, limit = config.query.QUERY_LIMIT, ...fields } = queryString;
  const query = Object.create({});
  if (Object.keys(fields).length > 0) {
    for (const property in fields) {
      query[property] = fields[property];
    }
  }

  const customLabels = {
    totalDocs: "totalCount",
    docs: "data",
    limit: "perPage",
    page: "currentPage",
  };

  return await Article.paginate(query, {
    page,
    limit,
    customLabels,
  });
};

const updateArticle = async (articleId, reqBody) => {
  return await Article.findByIdAndUpdate(articleId, reqBody, {
    new: true,
    runValidators: true,
  });
};

const deleteArticle = async (articleId) => {
  return await Article.findByIdAndUpdate(
    articleId,
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
  addArticle,
  getArticles,
  updateArticle,
  deleteArticle,
};
