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

// ADD CAMERA
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

// GET CAMERAS + ATTACH TASKS & STAFF
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

    // All cameras of this user
    const cameras = await Camera.find({ user: user._id }).lean();

    // All task docs for this user (remember: tasks are stored in an array inside each doc)
    const taskDocs = await Task.find({ userId: user._id }).lean();

    // Flatten tasks by cameraName
    const tasksByCameraName = {};
    taskDocs.forEach((doc) => {
      (doc.tasks || []).forEach((t) => {
        if (!tasksByCameraName[t.cameraName]) {
          tasksByCameraName[t.cameraName] = [];
        }
        tasksByCameraName[t.cameraName].push(t);
      });
    });

    // All staff docs for this user
    const staffDocs = await Staff.find({ userId: user._id }).lean();
    const staffByCameraName = {};
    staffDocs.forEach((s) => {
      if (!staffByCameraName[s.cameraName]) {
        staffByCameraName[s.cameraName] = [];
      }
      staffByCameraName[s.cameraName].push(s);
    });

    // Attach tasks + staff to each camera by camera.name
    const camerasWithDetails = cameras.map((camera) => {
      const camName = camera.name;
      return {
        ...camera,
        tasks: tasksByCameraName[camName] || [],
        staff: staffByCameraName[camName] || [],
      };
    });

    return res.json({
      success: true,
      cameras: camerasWithDetails,
      userEmail: user.email,
    });
  } catch (err) {
    return sendServerError(res, err);
  }
};

// DELETE CAMERA + RELATED TASKS & STAFF
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

    const cameraName = camera.name;

    // 1) Remove all tasks (subdocuments) that belong to this cameraName
    //    from all Task docs of this user
    await Task.updateMany(
      { userId: user._id },
      { $pull: { tasks: { cameraName: cameraName } } }
    );

    // 2) Remove all Staff docs assigned to this camera for this user
    await Staff.deleteMany({
      userId: user._id,
      cameraName: cameraName,
    });

    // 3) Delete the camera itself
    await Camera.findByIdAndDelete(req.params.id);

    return res.json({ success: true, userEmail: user.email });
  } catch (err) {
    return sendServerError(res, err);
  }
};

// UPDATE CAMERA + KEEP TASKS & STAFF IN SYNC IF NAME CHANGES
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

    const oldName = cameraToUpdate.name;

    const updatedCamera = await Camera.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    // If camera name changed, also update related tasks & staff
    if (updateData.name && updateData.name !== oldName) {
      const newName = updateData.name;

      // Update cameraName inside tasks subdocuments
      await Task.updateMany(
        { userId: user._id },
        {
          $set: {
            "tasks.$[elem].cameraName": newName,
          },
        },
        {
          arrayFilters: [{ "elem.cameraName": oldName }],
        }
      );

      // Update cameraName for staff assigned to this camera
      await Staff.updateMany(
        { userId: user._id, cameraName: oldName },
        { cameraName: newName }
      );
    }

    return res.json({
      success: true,
      camera: updatedCamera,
      userEmail: user.email,
    });
  } catch (err) {
    return sendServerError(res, err);
  }
};

// GET CAMERA NAMES
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
        .status(404)
        .json({ success: false, message: "User not found." });

    const cameras = await Camera.find({ user: user._id }).select("name");
    const cameraNames = cameras.map((camera) => camera.name);

    return res.json({ success: true, cameraNames, userEmail: user.email });
  } catch (err) {
    return sendServerError(res, err);
  }
};
