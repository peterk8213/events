const Event = require("../../models/events");

const { StatusCodes } = require("http-status-codes");

const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    // remember adding user_id in the query
    //const event = await Event.findByIdAndDelete({ _id: eventId });
    const event = await Event.findById({ _id: eventId });
    event.is_deleted = true;
    await event.save();
    res.status(StatusCodes.OK).json({ msg: "request successful ):" });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong try again later" });
  }
};

module.exports = { deleteEvent };
