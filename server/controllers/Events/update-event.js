const Event = require("../../models/events");
const { StatusCodes } = require("http-status-codes");

const {
  UnauthenticatedError,
  BadRequestError,
  NotFoundError,
} = require("../../errors");

const updateEvent = async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const { userId } = req.user;

    const updates = req.body;
    if (!updates) {
      throw new BadRequestError("no fields to update");
    }
    const event = await Event.findOne({ _id: eventId, organizer_id: userId });

    if (!event || event.is_deleted) {
      throw new NotFoundError("sorry event not found");
    }

    // Update only specified fields
    Object.keys(updates).forEach((key) => {
      event[key] = updates[key];
    });

    // Save updated event
    await event.save();
    res.status(StatusCodes.OK).json({ msg: "updated successfully", event });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { updateEvent };
