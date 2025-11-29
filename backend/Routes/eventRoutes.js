const express = require("express");
const router = express.Router();
const { addEvent, getEvents } = require("../Controllers/eventController");

router.post("/add-event", addEvent);
router.get("/events", getEvents);

module.exports = router;
