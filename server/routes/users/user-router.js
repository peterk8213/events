////////////////

const express = require("express");
const router = express.Router();

/////import all functions

const { followUser } = require("../../controllers/users/follow");
const { unfollowUser } = require("../../controllers/users/unfollow");

////////// all routes
router.post("/followUser", followUser);
router.post("/unfollowUser", unfollowUser);

// export router
module.exports = router;
