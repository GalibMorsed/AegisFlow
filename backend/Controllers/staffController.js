const Staff = require("../Models/Staff");

// ADD STAFF
exports.addStaff = async (req, res) => {
  try {
    const { location, cameraName, staffId, staffName } = req.body;

    const staff = await Staff.create({
      location,
      cameraName,
      staffId,
      staffName,
      userId: req.user._id,
    });

    res.status(201).json({
      success: true,
      staff,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL STAFF
exports.getStaffs = async (req, res) => {
  try {
    const staffs = await Staff.find({ userId: req.user._id });
    res.json(staffs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
