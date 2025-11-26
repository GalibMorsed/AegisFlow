const mongoose = require("mongoose");

const CameraSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Camera name is required."],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Camera location is required."],
      trim: true,
    },
    type: {
      type: String,
      required: [true, "Camera type is required."],
      enum: ["IP Camera", "Device Camera", "CCTV"],
    },
    ip: {
      type: String, // No unique or required constraint
    },
    lat: {
      type: Number,
      required: [true, "Latitude is required."],
    },
    lng: {
      type: Number,
      required: [true, "Longitude is required."],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Camera", CameraSchema);
