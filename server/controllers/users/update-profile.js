const User = require("../../models/User");
const { StatusCodes } = require("http-status-codes");

const updateProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = {};

    // Check and add each field to updates object if present in the request body
    if (req.body.username) updates.username = req.body.username;
    if (req.body.bio) updates.bio = req.body.bio;
    if (req.body.gender) updates.gender = req.body.gender;
    if (req.body.profile_picture)
      updates.profile_picture = req.body.profile_picture;
    if (req.body.instagram_profile)
      updates.instagram_profile = req.body.instagram_profile;

    // Ensure there are fields to update
    if (Object.keys(updates).length === 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: "No valid fields to update" });
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, updates, {
      new: true,
      runValidators: true,
    });
    res.status(StatusCodes.CREATED).json({ msg: "updated successfully", user });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong try again later" });
  }
};

module.exports = { updateProfile };
