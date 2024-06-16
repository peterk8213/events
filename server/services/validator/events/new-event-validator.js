const { body } = require("express-validator");
const { validationResult } = require("express-validator");
const validateRequest = require("../validateRequest");

const createEventValidator = [
  body("title")
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Event title must be between 3 and 100 characters"),

  body("description")
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage("Event description must be between 3 and 200 characters"),

  // body("organizer_id")
  //   .trim()
  //   .isMongoId()
  //   .withMessage("Invalid organizer ID format"),

  body("location.address").trim().notEmpty().withMessage("Address is required"),

  body("location.town").trim().notEmpty().withMessage("Town is required"),

  body("start_time")
    .isISO8601()
    .toDate()
    .withMessage("Invalid start time format"),

  body("end_time").isISO8601().toDate().withMessage("Invalid end time format"),

  body("media_type").trim().notEmpty().withMessage("Media type is required"),

  body("hashtags")
    .isArray({ min: 1 })
    .withMessage("At least one hashtag is required"),

  validateRequest, // Middleware to handle validation errors
];

module.exports = createEventValidator;
