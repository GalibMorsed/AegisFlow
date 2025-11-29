const express = require("express");
const router = express.Router();
const Event = require("../Models/Event");
const User = require("../Models/Users");

router.post("/add", async (req, res) => {
  const { email, details1, details2 } = req.body;

  const user = await User.findOne({ email });
  const event = await Event.create({ user: user._id, details1, details2 });
  res.json({ success: true, event });
});

router.post("/get", async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  const events = await Event.find({ user: user._id });
  res.json({ success: true, events });
});

module.exports = router;
