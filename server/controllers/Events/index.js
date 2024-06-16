const { createEvent } = require("./new-event");
const { getEvents } = require("./get-events");

const { deleteEvent } = require("./delete-event");
const { updateEvent } = require("./update-event");

const { getSingleEvent } = require("./get-single-event");
const { getUserEvents } = require("./get-user-uploaded-events");

module.exports = {
  createEvent,
  getEvents,
  deleteEvent,
  updateEvent,
  getSingleEvent,
  getUserEvents,
};
