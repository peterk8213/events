const SavedEvents = require("../../models/saved-events");

const { StatusCodes } = require("http-status-codes");

const {
  UnauthenticatedError,
  BadRequestError,
  NotFoundError,
} = require("../../errors");

const saveEvent = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    const { userId } = req.user;

    const is_saved = await SavedEvents.findOne({ eventId, userId });
    if (is_saved) {
      throw new BadRequestError("event already saved");
    }

    const savedEvent = await SavedEvents.create({ userId, eventId });

    res.status(StatusCodes.OK).json({ savedEvent });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = { saveEvent };
