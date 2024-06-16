const User = require("../../models/User");
const { StatusCodes } = require("http-status-codes");
const {
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} = require("../../errors");

const followUser = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const tobeFollowedUserId = req.params.userId;

    // Check if the user is already following tobeFollowedUserId
    const user = await User.findById(userId);

    if (!user._id) {
      throw new NotFoundError("user not found");
    }
    if (user.following.some((f) => f.userId.equals(tobeFollowedUserId))) {
      throw new BadRequestError("You are already following this user");
    }

    // Add userId to tobeFollowedUserId's followers
    const followedUser = await User.findByIdAndUpdate(
      tobeFollowedUserId,
      {
        $addToSet: {
          followers: { followerId: userId, username: user.username },
        },
        $inc: { total_followers: 1 },
      },
      { new: true }
    );

    // Add tobeFollowedUserId to userId's following
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: {
          following: {
            userId: tobeFollowedUserId,
            username: followedUser.username,
          },
        },
        $inc: { total_following: 1 },
      },
      { new: true }
    );

    res.status(200).json({ message: `followed ${followedUser.username}` });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = { followUser };
