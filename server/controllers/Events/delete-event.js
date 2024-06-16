const Event = require("../../models/events");

const { StatusCodes } = require("http-status-codes");

const {
  UnauthenticatedError,
  BadRequestError,
  NotFoundError,
} = require("../../errors");

const deleteEvent = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const eventId = req.params.id;

    // remember adding user_id in the query
    //const event = await Event.findByIdAndDelete({ _id: eventId });
    const event = await Event.findOne({ _id: eventId, organizer_id: userId });

    if (!event || event.is_deleted) {
      throw new NotFoundError("Sorry, event does not exist");
    }
    event.is_deleted = true;
    await event.save();
    res.status(StatusCodes.OK).json({ msg: "request successful ):" });
  } catch (error) {
    next(error);
  }
};
module.exports = { deleteEvent };
