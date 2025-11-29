const Task = require("../Models/Task");

// CREATE TASK
exports.addTask = async (req, res) => {
  try {
    const { user, camera, status, startTime, endTime } = req.body;

    const task = await Task.create({
      camera,
      status,
      startTime,
      endTime,
      userId: req.user._id,
    });

    res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL TASKS
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
