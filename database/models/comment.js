const mongoose = require("../connection");
const { parseDate } = require("../../services/date");

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    article: {
      type: Schema.Types.ObjectId,
      ref: "Article",
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

commentSchema.set("toJSON", { virtuals: true });
commentSchema.set("toObject", { virtuals: true });

commentSchema.pre(/^find/, function (next) {
  this.find({ deletedAt: { $exists: false } });

  next();
});

commentSchema.method("toJSON", function () {
  const { __v, _id, createdAt, updatedAt, ...object } = this.toObject();
  const comment = {
    id: _id,
    ...object,
    createdAt: parseDate(createdAt),
    updatedAt: parseDate(updatedAt),
  };

  return comment;
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
