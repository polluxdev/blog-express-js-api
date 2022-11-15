const { body, validationResult } = require("express-validator");

const articleValidationRules = () => {
  return [
    body("title")
      .isLength({ min: 2 })
      .withMessage("Article title must be at least 2 characters."),
    body("body")
      .isLength({ min: 2 })
      .withMessage("Article body must be at least 2 characters."),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    success: false,
    message: "Validation error.",
    errors: extractedErrors,
  });
};

module.exports = {
  articleValidationRules,
  validate,
};
