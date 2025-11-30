// routes/operationsRoutes.js
const express = require("express");
const router = express.Router();
const operations = require("../Controllers/profileController");

// ensureAuth should attach req.user or req.userDoc
router.post("/addevents", operations.addEvent);
router.get("/getevents", operations.getEvents);
router.delete("/deleteevent/:id", operations.deleteEvent);

router.post("/addstaffs", operations.addStaff);
router.get("/getstaffs", operations.getStaffs);
router.delete("/deletestaff/:id", operations.deleteStaff);

router.post("/addtasks", operations.addTask);
router.get("/gettasks", operations.getTasks);
router.delete("/deletetask/:id", operations.deleteTask);

module.exports = router;
