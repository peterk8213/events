const Event = require("../../models/events");
const { StatusCodes } = require("http-status-codes");

const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    const updates = req.body;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
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
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong try again later" });
  }
};

module.exports = { updateEvent };
