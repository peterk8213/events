////////////////

const express = require("express");
const router = express.Router();

/////import all functions

const { followUser } = require("../../controllers/users/follow");
const { unfollowUser } = require("../../controllers/users/unfollow");
const { viewProfile } = require("../../controllers/users/profile");

////////// all routes
router.post("/followUser", followUser);
router.post("/unfollowUser", unfollowUser);
router.get("/profile", viewProfile);

// export router
module.exports = router;
