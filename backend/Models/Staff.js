const mongoose = require("mongoose");

const StaffSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    location: String,
    camera: String,
    staffId: String,
    staffName: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Staff", StaffSchema);
