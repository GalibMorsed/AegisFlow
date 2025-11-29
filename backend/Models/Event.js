const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
});

module.exports = mongoose.model("Event", eventSchema);
