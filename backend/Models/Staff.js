const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const staffSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  staffMembers: [
    {
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
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const StaffModel = mongoose.model("Staff", staffSchema);
module.exports = StaffModel;
