const express = require("express");
const router = express.Router();
const { register } = require("../../controllers/auth/signup");
const { login } = require("../../controllers/auth/login");

const {
  signupValidator,
  loginValidator,
} = require("../../services/validator/auth");
const validateRequest = require("../../services/validator/validateRequest");

// auth paths

router.post("/user/register", signupValidator, validateRequest, register);
router.post("/user/login", loginValidator, validateRequest, login);

module.exports = router;
