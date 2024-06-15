const { followUser } = require("./follow");
const { viewProfile } = require("./profile");

const { unfollowUser } = require("./unfollow");
const { updateProfile } = require("./update-profile");

module.exports = {
  updateProfile,
  unfollowUser,
  viewProfile,
  followUser,
};
