const express = require("express");
const router = express.Router();
const Staff = require("../Models/Staff");
const User = require("../Models/Users");

router.post("/add", async (req, res) => {
  const { email, location, camera, staffId, staffName } = req.body;

  const user = await User.findOne({ email });
  const staff = await Staff.create({
    user: user._id,
    location,
    camera,
    staffId,
    staffName,
  });

  res.json({ success: true, staff });
});

router.post("/get", async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  const staff = await Staff.find({ user: user._id });
  res.json({ success: true, staff });
});

module.exports = router;
