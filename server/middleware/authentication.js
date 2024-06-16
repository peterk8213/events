const User = require("../models/User");
const jwt = require("jsonwebtoken");

const { UnauthenticatedError, BadRequestError } = require("../errors");

const { StatusCodes } = require("http-status-codes");

// Assuming you have a secret key stored securely in your environment variables
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateUser = (req, res, next) => {
  // Define paths that should skip authentication
  const excludedPaths = [
    "/api/v1/auth/user/login",
    "/api/v1/auth/user/signup",
    "/api/v1/auth/user/logout",
  ];

  // Check if current request path is in excluded paths
  if (excludedPaths.includes(req.path)) {
    return next(); // Skip authentication for excluded paths
  }
  // Extract token from cookie
  const token = req.signedCookies.Token;

  if (!token) {
    throw new BadRequestError("No token provided");
  }

  try {
    // Verify token
    const payload = jwt.verify(token, JWT_SECRET);
    // Attach decoded user information to the request object
    req.user = payload;
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    next(error);
  }
};

module.exports = { authenticateUser };
