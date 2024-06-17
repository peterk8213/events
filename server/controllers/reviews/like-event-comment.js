const EventMetaData = require("../../models/comments-likes");
const mongoose = require("mongoose");

const { StatusCodes } = require("http-status-codes");
const {
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} = require("../../errors");

const likeComment = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { commentId, eventId } = req.body;

    if (!commentId || !eventId) {
      throw new BadRequestError("please provide all the values");
    }

    const eventMetaData = await EventMetaData.findOne({ eventId });

    if (!eventMetaData) {
      throw new Error("Event not found");
    }

    const comment = eventMetaData.comments.id(commentId);

    if (!comment) {
      throw new Error("Comment not found");
    }

    const alreadyLiked = comment.comment_likes.some((like) =>
      like.userId.equals(userId)
    );

    if (alreadyLiked) {
      throw new Error("User has already liked this comment");
    }
    const result = await EventMetaData.findOneAndUpdate(
      {
        eventId,
        "comments._id": commentId,
      },
      {
        $push: { "comments.$.comment_likes": { userId } },
        $inc: {
          "comments.$.comment_total_likes": 1,
          event_total_likes: 1,
        },
      },
      { new: true }
    );
    if (!result) {
      throw new NotFoundError("comment not found");
    }

    res.status(StatusCodes.OK).json({ result });
  } catch (error) {
    console.log("/n", error);
    next(error);
  }
};

module.exports = { likeComment };
