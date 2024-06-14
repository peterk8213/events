const mongoose = require("mongoose");
const ReviewsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
      minlength: [3, "review  must be at least 3 characters"],
      maxlength: [100, " review cannot be more than 100 characters"],
    },
    eventId: {
      type: mongoose.Schema.ObjectId,
      ref: "Event",
      required: true,
    },
    rating: {
      type: Number,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot be more than 5"],
      required: true,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewsSchema);
