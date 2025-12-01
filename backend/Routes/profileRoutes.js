// routes/operationsRoutes.js
const express = require("express");
const router = express.Router();
const operations = require("../Controllers/profileController");
const { updateTask } = require("../Controllers/profileController");

// ensureAuth should attach req.user or req.userDoc
router.post("/addevents", operations.addEvent);
router.post("/getevents", operations.getEvents);
router.delete("/deleteevent/:id", operations.deleteEvent);

router.post("/addstaffs", operations.addStaff);
router.post("/getstaffs", operations.getStaffs);
router.delete("/deletestaff/:id", operations.deleteStaff);

router.post("/addtasks", operations.addTask);
router.post("/gettasks", operations.getTasks);
router.delete("/deletetask/:id", operations.deleteTask);

router.put("/updatetask/:id", updateTask);

module.exports = router;
