const mongoose = require("mongoose");

const SavedEventsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SavedEvents", SavedEventsSchema);
