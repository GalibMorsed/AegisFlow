const mongoose = require("mongoose");

const CameraSchema = new mongoose.Schema({
  name: String,
  location: String,
  type: String,
  ip: String,
  lat: Number,
  lng: Number,

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "logUsers",
    required: true,
  },

  videos: [
    {
      url: String,
      recordedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("Camera", CameraSchema);
