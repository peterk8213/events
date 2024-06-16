const User = require("../../models/User");
const { StatusCodes } = require("http-status-codes");

const {
  UnauthenticatedError,
  BadRequestError,
  NotFoundError,
} = require("../../errors");

const login = async (req, res, next) => {
  try {
    const { input, password } = req.body;

    const isEmail = req.isEmail;

    // Find user by email or username
    const user = isEmail
      ? await User.findOne({ email: input })
      : await User.findOne({ username: input });

    if (!user) {
      throw new UnauthenticatedError("Invalid credentials");
    }

    if (user) {
      isMatch = await user.comparePassword(password);
      if (!isMatch) {
        throw new BadRequestError("Invalid phone number or password");
      }

      const token = user.createJWT();
      res
        .status(200)
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
          msg: "Login successful",
          userinfo: {
            username: user.username,
          },
        });
    }
  } catch (error) {
    next(error);
    console.log(error);
  }
};

module.exports = { login };
