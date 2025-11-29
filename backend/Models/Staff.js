const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  cameraName: {
    type: String,
    required: true,
  },
  staffId: {
    type: String,
    required: true,
  },
  staffName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Staff", staffSchema);
