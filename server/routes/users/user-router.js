////////////////

const express = require("express");
const router = express.Router();

/////import all functions

const {
  updateProfile,
  unfollowUser,
  viewProfile,
  followUser,
} = require("../../controllers/users");

///// user route input validators

const {
  followUserValidator,
  unfollowUserValidator,
} = require("../../services/validator/users/");

const validateRequest = require("../../services/validator/validateRequest");

////////// all routes
router.post(
  "/followUser/:userId",
  followUserValidator,
  validateRequest,
  followUser
);
router.post(
  "/unfollowUser/:userId",
  unfollowUserValidator,
  validateRequest,
  unfollowUser
);

router.get("/profile", viewProfile);
router.patch("/profile/edit/", updateProfile);

// export router
module.exports = router;
