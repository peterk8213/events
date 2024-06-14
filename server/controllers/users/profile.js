const User = require("../../models/User");
const { StatusCodes } = require("http-status-codes");

const viewProfile = async (req, res) => {
  try {
    // change when jwt is implemented
    const { userId } = req.body;
    const user = await User.findById({ _id: userId }).select(
      "-email -birthdate -country -gender -following -followers -isVerified -password"
    );
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "user not found" });
    }
    res.status(StatusCodes.OK).json({ msg: "success!", user });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong try again later" });
  }
};

module.exports = { viewProfile };
