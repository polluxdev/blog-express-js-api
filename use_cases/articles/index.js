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
  const { skip, limit, ...fields } = queryString;

  const query = Object.create({});
  if (Object.keys(fields).length > 0) {
    for (const property in fields) {
      query[property] = {
        $regex: fields[property],
        $options: "i",
      };
    }
  }

  return await Article.find(query).limit(limit).skip(skip);
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
