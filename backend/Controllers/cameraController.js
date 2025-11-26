const Camera = require("../Models/camera");

exports.addCamera = async (req, res) => {
  try {
    const camera = await Camera.create(req.body);
    res.json({ success: true, camera });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getCameras = async (req, res) => {
  const cameras = await Camera.find();
  res.json(cameras);
};

exports.deleteCamera = async (req, res) => {
  await Camera.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};

exports.updateCamera = async (req, res) => {
  const updated = await Camera.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};
