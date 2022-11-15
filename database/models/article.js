const mongoosePaginate = require("mongoose-paginate-v2");

const mongoose = require("../connection");
const { parseDate } = require("../../services/date");

const Schema = mongoose.Schema;

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    deletedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

articleSchema.set("toJSON", { virtuals: true });
articleSchema.set("toObject", { virtuals: true });

articleSchema.plugin(mongoosePaginate);

articleSchema.pre(/^find/, function (next) {
  this.find({ deletedAt: { $exists: false } });

  next();
});

articleSchema.method("toJSON", function () {
  const { __v, _id, createdAt, updatedAt, ...object } = this.toObject();
  const article = {
    id: _id,
    ...object,
    createdAt: parseDate(createdAt),
    updatedAt: parseDate(updatedAt),
  };

  return article;
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
