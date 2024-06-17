const EventMetaData = require("../../models/comments-likes");
const Event = require("../../models/events.js");

const { StatusCodes } = require("http-status-codes");
const {
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} = require("../../errors");

const addComment = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { commentText, eventId } = req.body;

    if (!commentText || !eventId) {
      throw new BadRequestError("please provide all the values");
    }

    const result = await EventMetaData.findOneAndUpdate(
      { eventId },
      {
        $push: {
          comments: {
            userId: userId,
            comment_text: commentText,
          },
        },
        $inc: { event_total_comments: 1 },
      },
      { new: true, upsert: true }
    );

    if (!result) {
      throw new NotFoundError("event not found ");
    }

    res.status(StatusCodes.OK).json({ result });
  } catch (error) {
    next(error);
  }
};

module.exports = { addComment };
