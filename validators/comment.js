const { body, validationResult } = require("express-validator");

const commentValidationRules = () => {
  return [
    body("body")
      .isLength({ min: 2 })
      .withMessage("Comment body must be at least 2 characters."),
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
  commentValidationRules,
  validate,
};
