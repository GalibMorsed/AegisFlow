const express = require("express");
const router = express.Router();
const { addTask, getTasks } = require("../Controllers/tasksController");

router.post("/add-task", addTask);
router.get("/tasks", getTasks);

module.exports = router;
