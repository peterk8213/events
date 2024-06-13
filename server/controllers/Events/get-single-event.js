const Event = require("../../models/events");

const { StatusCodes } = require("http-status-codes");

const getSingleEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const query = { is_deleted: { $ne: true }, _id: eventId }; // Exclude documents with is_deleted: true

    // Create a promise for the count
    const countPromise = Event.countDocuments(query);

    // Create a promise for the query
    const eventsPromise = Event.find(query).lean();

    // Await both promises
    const [count, events] = await Promise.all([countPromise, eventsPromise]);
    if (!events) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "event not found" });
    }
    res.status(StatusCodes.OK).json({ count, events });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong try again later" });
  }
};

module.exports = { getSingleEvent };
