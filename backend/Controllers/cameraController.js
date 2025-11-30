const Camera = require("../Models/camera");
const User = require("../Models/Users");
const Task = require("../Models/Task");
const Staff = require("../Models/Staff");

const sendServerError = (res, err) => {
  console.error(err);
  return res
    .status(500)
    .json({ success: false, message: err.message || "Server error" });
};

exports.addCamera = async (req, res) => {
  try {
    const { email, ...cam } = req.body;
    if (!email)
      return res
        .status(400)
        .json({ success: false, message: "Email is required." });

    const user = await User.findOne({ email }).select("_id email");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found." });

    const camera = await Camera.create({ ...cam, user: user._id });
    return res.json({ success: true, camera, userEmail: user.email });
  } catch (err) {
    return sendServerError(res, err);
  }
};

exports.getCameras = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res
        .status(400)
        .json({ success: false, message: "Email is required." });

    const user = await User.findOne({ email }).select("_id email");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found." });

    const cameras = await Camera.find({ user: user._id }).lean();
    return res.json({ success: true, cameras, userEmail: user.email });
  } catch (err) {
    return sendServerError(res, err);
  }
};

exports.deleteCamera = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res
        .status(400)
        .json({ success: false, message: "Email is required." });

    const user = await User.findOne({ email }).select("_id email");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found." });

    const camera = await Camera.findById(req.params.id);
    if (!camera)
      return res
        .status(404)
        .json({ success: false, message: "Camera not found." });

    // ownership check
    if (!camera.user || camera.user.toString() !== user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Camera does not belong to user.",
      });
    }

    // Delete associated tasks and staff
    await Task.deleteMany({ cameraName: camera.name });
    await Staff.deleteMany({ cameraName: camera.name });

    // Delete the camera
    await Camera.findByIdAndDelete(req.params.id);
    return res.json({ success: true, userEmail: user.email });
  } catch (err) {
    return sendServerError(res, err);
  }
};

exports.updateCamera = async (req, res) => {
  try {
    const { email, ...updateData } = req.body;
    if (!email)
      return res
        .status(400)
        .json({ success: false, message: "Email is required." });

    const user = await User.findOne({ email }).select("_id email");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found." });

    const cameraToUpdate = await Camera.findById(req.params.id);
    if (!cameraToUpdate)
      return res
        .status(404)
        .json({ success: false, message: "Camera not found." });

    if (
      !cameraToUpdate.user ||
      cameraToUpdate.user.toString() !== user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Camera does not belong to user.",
      });
    }

    const updatedCamera = await Camera.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    return res.json({
      success: true,
      camera: updatedCamera,
      userEmail: user.email,
    });
  } catch (err) {
    return sendServerError(res, err);
  }
};

exports.getCameraNames = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res
        .status(400)
        .json({ success: false, message: "Email is required." });

    const user = await User.findOne({ email }).select("_id email");
    if (!user)
      return res
        .status(44)
        .json({ success: false, message: "User not found." });

    const cameras = await Camera.find({ user: user._id }).select("name");
    const cameraNames = cameras.map((camera) => camera.name);
    return res.json({ success: true, cameraNames, userEmail: user.email });
  } catch (err) {
    return sendServerError(res, err);
  }
};
