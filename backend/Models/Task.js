const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tasks: [
    {
      cameraName: {
        type: String,
        required: true,
      },
      taskType: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
      startTime: {
        type: String,
      },
      endTime: {
        type: String,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TaskModel = mongoose.model("Task", taskSchema);
module.exports = TaskModel;
