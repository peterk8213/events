const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const login = async (req, res, next) => {
  try {
    const { input, password } = req.body;

    const isValidEmail = true; // i have hard coded it to only use email for now. /// will change later

    const isValidPhone = /^\d{10}$/.test(input); // Example: 10-digit phone number

    let isMatch = false;
    if (isValidEmail) {
      try {
        const user = await User.findOne({ email: input });
        if (!user) {
          throw new Error("Invalid email or password");
        }
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
            userinfo: {
              username: user.username,
            },
          });
      } catch (error) {
        console.log(error);
      }
    } else if (isValidPhone) {
      const user = await User.findOne({ phonenumber: input });
      if (!user) {
        res.status(StatusCodes.BAD_REQUEST).json({
          msg: "Invalid phone number or password",
        });
        throw new Error("Invalid phone number or password");
      }
      isMatch = await user.comparePassword(password);
      if (!isMatch) {
        res.status(StatusCodes.BAD_REQUEST).json({
          msg: "Invalid account password",
        });
        throw new Error("Invalid phone number or password");
      }
      const token = user.createJWT();
      res
        .status(200)
        .json({
          userinfo: {
            username: user.username,
          },
        })
        .cookie("Token", token, {
          httpOnly: true,
          secure: true,
          path: "/", // Cookie is valid for requests to /api and its subpaths
          expires: new Date(Date.now() + 360000000), // Cookie expires in 100 hour
          sameSite: "Strict", // Cookie is only sent in same-site requests
          signed: true, // Cookie value is signed using a secret key});
        });
    } else {
      throw new Error("Invalid email or phone number format");
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { login };
