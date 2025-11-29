const Event = require("../Models/Event");

// CREATE EVENT
exports.addEvent = async (req, res) => {
  try {
    const { title, description } = req.body;

    const event = await Event.create({
      title,
      description,
    });

    res.status(201).json({
      success: true,
      event,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL EVENTS
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
