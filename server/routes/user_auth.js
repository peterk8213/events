const express = require("express");
const router = express.Router();
const { register } = require("../auth/signup");
const { login } = require("../auth/login");

// auth paths

router.post("/user/register", register);
router.post("/user/login", login);

module.exports = router;
