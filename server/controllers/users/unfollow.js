const User = require("../../models/User");
const { StatusCodes } = require("http-status-codes");

const unfollowUser = async (req, res) => {
  try {
    const { userId, tobeunfollowedUserId } = req.body;

    const user = await User.findById(userId);
    if (!user.following.some((f) => f.userId.equals(tobeunfollowedUserId))) {
      return res.status(400).json({
        message: "You can only follow users you are not already following.",
      });
    }
    // Update the user to remove tobeunfollowedUserId from following array
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { following: { userId: tobeunfollowedUserId } },
        $inc: { total_following: -1 },
      },
      { new: true }
    );

    // Update the tobeunfollowedUserId to remove userId from followers array
    await User.findByIdAndUpdate(tobeunfollowedUserId, {
      $pull: { followers: { followerId: userId } },
      $inc: { total_followers: -1 },
    });

    res
      .status(200)
      .json({ message: "User unfollowed successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { unfollowUser };
