const mongoose = require("mongoose");

const CameraSchema = new mongoose.Schema({
  name: String,
  location: String,
  type: String,
  ip: String,
  lat: Number,
  lng: Number,
  userEmail: String,
});

module.exports = mongoose.model("Camera", CameraSchema);
