const { createEvent } = require("./new-event");
const { getEvents } = require("./get-events");

const { deleteEvent } = require("./delete-event");
const { updateEvent } = require("./update-event");

const { getSingleEvent } = require("./get-single-event");
const { getUserEvents } = require("./get-user-uploaded-events");
const { saveEvent } = require("./save-event");

module.exports = {
  createEvent,
  getEvents,
  deleteEvent,
  updateEvent,
  getSingleEvent,
  getUserEvents,
  saveEvent,
};
