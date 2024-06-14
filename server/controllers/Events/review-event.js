const User = require("../../models/User");
const Event = require("../../models/events");

const Review = require("../../models/reviews");

const { StatusCodes } = require("http-status-codes");

const reviewEvent = async (req, res) => {
  try {
    const { userId, username, body, rating } = req.body;
    const eventId = req.params.eventid;
    const reviews = await Review.create({
      userId,
      username,
      body,
      eventId,
      rating,
    });

    if (reviews) {
      return res.status(StatusCodes.OK).json({ msg: "success!", reviews });
    }
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

module.exports = { reviewEvent };
