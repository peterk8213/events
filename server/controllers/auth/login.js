const User = require("../../models/User");
const { StatusCodes } = require("http-status-codes");

const login = async (req, res, next) => {
  try {
    const { input, password } = req.body;

    const isEmail = req.isEmail;

    // Find user by email or username
    const user = isEmail
      ? await User.findOne({ email: input })
      : await User.findOne({ username: input });

    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Invalid credentials" });
    }

    if (user) {
      isMatch = await user.comparePassword(password);
      if (!isMatch) {
        res.status(StatusCodes.BAD_REQUEST).json({
          msg: "Invalid phone number or password",
        });
        throw new Error("Invalid password");
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
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong try again later" });
    console.log(error);
  }
};

module.exports = { login };
