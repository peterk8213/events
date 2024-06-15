const { param } = require("express-validator");

const deleteEventValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid event ID")
    .notEmpty()
    .withMessage("Event ID is required"),
];

module.exports = deleteEventValidator;
