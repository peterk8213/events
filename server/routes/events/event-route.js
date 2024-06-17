////////////////

const express = require("express");
const router = express.Router();

/// import all event functions here: delete event, update,new,get

const {
  createEvent,
  getEvents,
  deleteEvent,
  updateEvent,
  getSingleEvent,
  getUserEvents,
  saveEvent,
} = require("../../controllers/Events");
const { reviewEvent } = require("../../controllers/reviews/review-event");

///// event route input validators

const {
  deleteEventValidator,
  getEventValidator,
  createEventValidator,
  reviewValidator,
} = require("../../services/validator/events");

const validateRequest = require("../../services/validator/validateRequest");

/////// all events routes:

router.post("/add", createEventValidator, createEvent);
router.get("/all", getEvents);
router.post("/save/:eventId", saveEvent);

router.delete(
  "/delete/:id",
  deleteEventValidator,
  validateRequest,
  deleteEvent
);
router.patch("/edit/:id", updateEvent);

router.get("/view/:id", getEventValidator, validateRequest, getSingleEvent);

router.get("/myUploads", getUserEvents);

router.post(
  "/review/add/:eventid",
  reviewValidator,
  validateRequest,
  reviewEvent
);

module.exports = router;
