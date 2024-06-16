//// user registration handler  //////

const User = require("../../models/User");
const { StatusCodes } = require("http-status-codes");
const { UnauthenticatedError, BadRequestError } = require("../../errors");

const register = async (req, res, next) => {
  try {
    const user = await User.create({ ...req.body });

    const token = user.createJWT();
    if (!token) {
      throw new UnauthenticatedError("invalid token");
    }

    res
      .status(StatusCodes.CREATED)
      .cookie("Token", token, {
        httpOnly: true,
        secure: true,
        path: "/", // Cookie is valid for requests to /api and its subpaths
        expires: new Date(Date.now() + 360000000), // Cookie expires in 100 hour
        sameSite: "Strict", // Cookie is only sent in same-site requests
        signed: true, // Cookie value is signed using a secret key});
      })
      .json({
        status: "ok",
        msg: "signup successful",
        user: {
          email: user.email,
          username: user.username,
          role: user.role,
          token: token,
        },
      });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { register };
