//// database schema for events ///

const mongoose = require("mongoose");
const EventsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: [3, " event title must be at least 3 characters"],
      maxlength: [100, " event title cannot be more than 100 characters"],
    },
    description: {
      type: String,
      minlength: [3, " event description must be at least 3 characters"],
      maxlength: [200, " event description cannot be more than 200 characters"],
      required: true,
    },
    organizer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    location: {
      address: {
        type: String,
        required: true,
      },
      landmark: {
        type: String,
        required: false,
      },
      town: {
        type: String,
        required: true,
      },
      coordinates: {
        lat: {
          type: Number,
          required: false,
        },
        lng: {
          type: Number,
          required: false,
        },
      },
    },
    start_time: {
      type: Date,
      required: true,
    },
    end_time: {
      type: Date,
      required: true,
    },
    is_virtual: {
      type: Boolean,
      default: false,
    },
    media_type: {
      type: String,
      required: true,
    },
    media_url: {
      type: String,
      required: true,
    },
    hashtags: [
      {
        type: String,
        required: true,
      },
    ],
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventsSchema);
