const Event = require("../../models/events");

const { StatusCodes } = require("http-status-codes");

const { NotFoundError } = require("../../errors");

const getUserEvents = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const query = { is_deleted: { $ne: true }, organizer_id: userId }; // Exclude documents with is_deleted: true

    // Create a promise for the count
    const countPromise = Event.countDocuments(query);

    // Create a promise for the query
    const eventsPromise = Event.find(query).sort("createdAt").lean();

    // Await both promises
    const [count, events] = await Promise.all([countPromise, eventsPromise]);
    if (!events || events === null) {
      throw new NotFoundError("event not found");
    }
    res.status(StatusCodes.OK).json({ count, events });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = { getUserEvents };
