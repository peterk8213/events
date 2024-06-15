const { check } = require("express-validator");
const email_regex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const loginValidator = [
  check("input")
    .notEmpty()
    .withMessage("Email or username is required")
    .custom((value, { req }) => {
      const isEmail = email_regex.test(value);
      const isUsername = /^[a-zA-Z0-9_.-]{3,50}$/.test(value);
      if (!isEmail && !isUsername) {
        throw new Error("Invalid email or username");
      }
      req.isEmail = isEmail;

      return true;
    }),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

module.exports = loginValidator;
