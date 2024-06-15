const { param } = require("express-validator");

const followUserValidator = [
  param("userId")
    .isMongoId()
    .withMessage("Invalid user ID")
    .notEmpty()
    .withMessage("Invalid user ID"),
];

module.exports = followUserValidator;
