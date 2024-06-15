const { body } = require("express-validator");
const User = require("../../../models/User"); // Adjust the path as needed

const signupValidator = [
  body("username")
    .isString()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Username must be between 3 and 50 characters")
    .custom(async (username) => {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        throw new Error("Username already in taken");
      }
    }),

  body("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .custom(async (email) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("email is already in use");
      }
    }),

  body("phonenumber")
    .isString()
    .trim()
    .isLength({ min: 10, max: 15 }) // Adjust length
    .withMessage("Please provide a valid phone number")
    .custom(async (phonenumber) => {
      const existingUser = await User.findOne({ phonenumber });
      if (existingUser) {
        throw new Error("phone number is already in use");
      }
    }),

  body("password")
    .isString()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),

  body("gender")
    .isIn(["male", "female", "other"])
    .withMessage("Gender must be either male, female, or other"),

  body("birthdate").isDate().withMessage("Please provide a valid birthdate"),
];

module.exports = signupValidator;
