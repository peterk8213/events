const express = require("express");
const router = express.Router();

const {
  addComment,
  likeComment,
  addLike,
} = require("../../controllers/reviews");

router.post("/add/comment", addComment);
router.post("/add/comment/like", likeComment);

router.post("/add/:eventId/like", addLike);

module.exports = router;
