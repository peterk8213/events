const Event = require("../../models/events");

const { StatusCodes } = require("http-status-codes");

const getEvents = async (req, res) => {
  try {
    const query = { is_deleted: { $ne: true } }; // Exclude documents with is_deleted: true

    // Create a promise for the count
    const countPromise = Event.countDocuments(query);

    // Create a promise for the query
    const eventsPromise = Event.find(query).sort("createdAt").lean();

    // Await both promises
    const [count, events] = await Promise.all([countPromise, eventsPromise]);

    res.status(StatusCodes.OK).json({ count, events });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong try again later" });
  }
};

module.exports = { getEvents };
