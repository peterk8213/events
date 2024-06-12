const Event = require("../../models/events");
const { StatusCodes } = require("http-status-codes");

const createEvent = async (req, res) => {
  try {
    const event_data = req.body;
    const event = await Event.create(event_data);
    res.status(StatusCodes.CREATED).json({ msg: "Event created" });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong try again later" });
  }
};

/////// export the functions

module.exports = { createEvent };
