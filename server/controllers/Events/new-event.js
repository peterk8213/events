const Event = require("../../models/events");
const { StatusCodes } = require("http-status-codes");
const { UnauthenticatedError, BadRequestError } = require("../../errors");

const createEvent = async (req, res,next) => {
  try {
    const event_data = req.body;

    const { userId } = req.user;
    if (!userId) {
      throw new UnauthenticatedError("invalid authentication please login");
    }

    event_data.organizer_id = userId;
    const event = await Event.create(event_data);
    res.status(StatusCodes.CREATED).json({ msg: "Event created" });
  } catch (error) {
    console.error(error);
    next(error)
};
}

/////// export the functions

module.exports = { createEvent };
