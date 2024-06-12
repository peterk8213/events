////////////////

const express = require("express");
const router = express.Router();

/// import all event functions here: delete event, update,new,get

const { createEvent } = require("../../controllers/Events/new-event");
const { getEvents } = require("../../controllers/Events/get-events");

const { deleteEvent } = require("../../controllers/Events/delete-event");
const { updateEvent } = require("../../controllers/Events/update-event");

const { getSingleEvent } = require("../../controllers/Events/get-single-event");
/////// all events routes:

router.post("/add", createEvent);
router.get("/all", getEvents);
router.delete("/delete/:id", deleteEvent);
router.patch("/edit/:id", updateEvent);
router.get("/:id", getSingleEvent);

module.exports = router;
