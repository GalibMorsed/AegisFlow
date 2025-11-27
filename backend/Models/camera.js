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

    deviceId: {
      type: String,
      trim: true,
      required: false,
    },
    label: {
      type: String,
      trim: true,
    },
    groupId: {
      type: String,
      trim: true,
    },
    kind: {
      type: String,
      trim: true,
    },

    enabled: {
      type: Boolean,
      default: true,
    },
    lastSeenAt: {
      type: Date,
      default: Date.now,
    },
    savedAt: {
      type: Date,
      default: Date.now,
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

// ensure device for same user cannot duplicate
CameraSchema.index({ user: 1, deviceId: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model("Camera", CameraSchema);
