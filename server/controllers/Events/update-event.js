const Event = require("../../models/events");
const { StatusCodes } = require("http-status-codes");

const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const updates = { ...req.body };
    const event = await Event.findByIdAndUpdate({ _id: eventId }, updates, {
      new: true,
      runValidators: true,
    });
    res
      .status(StatusCodes.CREATED)
      .json({ msg: "updated successfully", event });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong try again later" });
  }
};

module.exports = { updateEvent };
