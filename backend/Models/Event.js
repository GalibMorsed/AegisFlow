const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    details1: String,
    details2: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
