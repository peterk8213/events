const User = require("../../models/User");
const { StatusCodes } = require("http-status-codes");

const {
  UnauthenticatedError,
  BadRequestError,
  NotFoundError,
} = require("../../errors");

const viewProfile = async (req, res, next) => {
  try {
    // change when jwt is implemented
    const { userId } = req.user;
    const user = await User.findById({ _id: userId }).select(
      "-email -birthdate -country -gender -following -followers -isVerified -password -phonenumber -role"
    );
    if (!user) {
      throw new NotFoundError("user not found");
    }
    res.status(StatusCodes.OK).json({ msg: "success!", user });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { viewProfile };
