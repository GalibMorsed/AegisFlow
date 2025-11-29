const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  user: String,
  camera: Number,
  status: String, // <-- this!
  startTime: String,
  endTime: String,
});

module.exports = mongoose.model("Task", taskSchema);
