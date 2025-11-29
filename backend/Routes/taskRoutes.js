const express = require("express");
const router = express.Router();
const Task = require("../Models/Task");
const User = require("../Models/Users");

// ADD TASK
router.post("/add", async (req, res) => {
  try {
    const { email, title, time } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const task = await Task.create({ title, time, user: user._id });

    res.json({ success: true, task });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET ALL TASKS FOR USER
router.post("/get", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const tasks = await Task.find({ user: user._id });

    res.json({ success: true, tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
