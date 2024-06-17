const EventMetaData = require("../../models/comments-likes");
const Event = require("../../models/events.js");

const { StatusCodes } = require("http-status-codes");
const {
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} = require("../../errors");

const addLike = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const eventId = req.params.eventId;

    if (!eventId) {
      throw new BadRequestError("please provide all the eventId");
    }

    const eventMetaData = await EventMetaData.findOne({ eventId });

    if (!eventMetaData) {
      throw new Error("Event not found");
    }

    const alreadyLiked = eventMetaData.event_likes.some((like) =>
      like.userId.equals(userId)
    );

    if (alreadyLiked) {
      throw new Error("User has already liked this event");
    }

    const result = await EventMetaData.findOneAndUpdate(
      { eventId },
      {
        $push: {
          event_likes: {
            userId: userId,
          },
        },
        $inc: { event_total_likes: 1 },
      },
      { new: true, upsert: true }
    );

    if (!result) {
      throw new NotFoundError("event not found ");
    }

    res.status(StatusCodes.OK).json({ result });
  } catch (error) {
    console.log("/n", error);
    next(error);
  }
};

module.exports = { addLike };
