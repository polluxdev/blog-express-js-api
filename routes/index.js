const express = require("express");

const articlesRoutes = require("./articles");
const commentsRoutes = require("./comments");

const router = express.Router();

router.use("/", articlesRoutes);
router.use("/", commentsRoutes);

module.exports = router;
