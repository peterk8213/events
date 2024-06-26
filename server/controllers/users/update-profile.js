const User = require("../../models/User");
const { StatusCodes } = require("http-status-codes");

const {
  UnauthenticatedError,
  BadRequestError,
  NotFoundError,
} = require("../../errors");

const updateProfile = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const updates = {};

    // Check and add each field to updates object if present in the request body
    if (req.body.username) updates.username = req.body.username;
    if (req.body.bio) updates.bio = req.body.bio;
    if (req.body.profile_picture)
      updates.profile_picture = req.body.profile_picture;
    if (req.body.instagram_profile)
      updates.instagram_profile = req.body.instagram_profile;

    // Ensure there are fields to update
    if (Object.keys(updates).length === 0) {
      throw new BadRequestError("No valid fields to update");
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, updates, {
      new: true,
      runValidators: true,
    }).select(
      "-email -birthdate -country -gender -following -followers -isVerified -password -phonenumber -role"
    );

    if (!user || user === null) {
      throw new NotFoundError("User not found");
    }

    res.status(StatusCodes.CREATED).json({ msg: "updated successfully", user });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { updateProfile };
