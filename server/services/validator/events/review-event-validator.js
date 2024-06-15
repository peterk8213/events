const { body, param } = require("express-validator");

const reviewValidator = [
  param("eventid").isMongoId().withMessage("Invalid event id format"),

  body("body")
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Review must be between 3 and 100 characters"),

  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),

  //

  // Since userId will come from req.user, no need to validate it here
];

module.exports = reviewValidator;
