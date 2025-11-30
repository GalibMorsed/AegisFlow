const mongoose = require("mongoose");
const Event = require("../Models/Event");
const Staff = require("../Models/Staff");
const Task = require("../Models/Task");
const User = require("../Models/Users");

const sendServerError = (res, err) => {
  console.error(err);
  return res
    .status(500)
    .json({ success: false, message: err.message || "Server error" });
};

const sanitizeString = (v) => {
  if (typeof v !== "string") return "";
  return v.trim();
};

const parseDateOrNull = (v) => {
  if (!v) return null;
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d;
};

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

/* ==========================
   EVENTS
   ========================== */

exports.addEvent = async (req, res) => {
  try {
    const { email, title, description } = req.body;

    if (!email)
      return res
        .status(400)
        .json({ success: false, message: "Email is required." });

    const user = await User.findOne({ email }).select("_id email");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found." });

    const cleanedTitle = sanitizeString(title);
    const cleanedDescription = sanitizeString(description);

    if (!cleanedTitle)
      return res
        .status(400)
        .json({ success: false, message: "Title is required." });

    const event = await Event.create({
      title: cleanedTitle,
      description: cleanedDescription,
      userId: user._id,
      userEmail: user.email, // optional audit
    });

    return res
      .status(201)
      .json({ success: true, event, userEmail: user.email });
  } catch (err) {
    return sendServerError(res, err);
  }
};

exports.getEvents = async (req, res) => {
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

    const events = await Event.find({ userId: user._id })
      .lean()
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      events,
      count: events.length,
      userEmail: user.email,
    });
  } catch (err) {
    return sendServerError(res, err);
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { email } = req.body;
    const { id } = req.params;

    if (!email)
      return res
        .status(400)
        .json({ success: false, message: "Email is required." });

    if (!isValidObjectId(id))
      return res
        .status(400)
        .json({ success: false, message: "Invalid event id." });

    const user = await User.findOne({ email }).select("_id email");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found." });

    const event = await Event.findById(id);
    if (!event)
      return res
        .status(404)
        .json({ success: false, message: "Event not found." });

    if (!event.userId || event.userId.toString() !== user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Event does not belong to user.",
      });
    }

    await Event.findByIdAndDelete(id);
    return res.json({
      success: true,
      message: "Event deleted.",
      userEmail: user.email,
    });
  } catch (err) {
    return sendServerError(res, err);
  }
};

/* ==========================
   STAFF
   ========================== */

exports.addStaff = async (req, res) => {
  try {
    const { email, location, cameraName, staffId, staffName } = req.body;

    if (!email)
      return res
        .status(400)
        .json({ success: false, message: "Email is required." });

    const user = await User.findOne({ email }).select("_id email");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found." });

    const cLocation = sanitizeString(location);
    const cCameraName = sanitizeString(cameraName);
    const cStaffId = sanitizeString(staffId);
    const cStaffName = sanitizeString(staffName);

    if (!cCameraName || !cStaffId || !cStaffName)
      return res.status(400).json({
        success: false,
        message: "cameraName, staffId and staffName are required.",
      });

    const staff = await Staff.create({
      location: cLocation,
      cameraName: cCameraName,
      staffId: cStaffId,
      staffName: cStaffName,
      userId: user._id,
      userEmail: user.email,
    });

    return res
      .status(201)
      .json({ success: true, staff, userEmail: user.email });
  } catch (err) {
    return sendServerError(res, err);
  }
};

exports.getStaffs = async (req, res) => {
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

    const staffs = await Staff.find({ userId: user._id })
      .lean()
      .sort({ createdAt: -1 });
    return res.json({
      success: true,
      staffs,
      count: staffs.length,
      userEmail: user.email,
    });
  } catch (err) {
    return sendServerError(res, err);
  }
};

exports.deleteStaff = async (req, res) => {
  try {
    const { email } = req.body;
    const { id } = req.params;

    if (!email)
      return res
        .status(400)
        .json({ success: false, message: "Email is required." });

    if (!isValidObjectId(id))
      return res
        .status(400)
        .json({ success: false, message: "Invalid staff id." });

    const user = await User.findOne({ email }).select("_id email");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found." });

    const staff = await Staff.findById(id);
    if (!staff)
      return res
        .status(404)
        .json({ success: false, message: "Staff not found." });

    if (!staff.userId || staff.userId.toString() !== user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Staff does not belong to user.",
      });
    }

    await Staff.findByIdAndDelete(id);
    return res.json({
      success: true,
      message: "Staff deleted.",
      userEmail: user.email,
    });
  } catch (err) {
    return sendServerError(res, err);
  }
};

/* ==========================
   TASKS
   ========================== */

exports.addTask = async (req, res) => {
  try {
    const { email, cameraName, taskType, status, startTime, endTime } =
      req.body;

    if (!email)
      return res
        .status(400)
        .json({ success: false, message: "Email is required." });

    const user = await User.findOne({ email }).select("_id email");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found." });

    const cCameraName = sanitizeString(cameraName);
    const cTaskType = sanitizeString(taskType);
    const cStatus = sanitizeString(status) || "pending";
    const cStart = parseDateOrNull(startTime);
    const cEnd = parseDateOrNull(endTime);

    if (!cCameraName || !cTaskType)
      return res.status(400).json({
        success: false,
        message: "cameraName and taskType are required.",
      });

    const payload = {
      cameraName: cCameraName,
      taskType: cTaskType,
      status: cStatus,
      userId: user._id,
      userEmail: user.email,
    };
    if (cStart) payload.startTime = cStart;
    if (cEnd) payload.endTime = cEnd;

    const task = await Task.create(payload);
    return res.status(201).json({ success: true, task, userEmail: user.email });
  } catch (err) {
    return sendServerError(res, err);
  }
};

exports.getTasks = async (req, res) => {
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

    const tasks = await Task.find({ userId: user._id })
      .lean()
      .sort({ createdAt: -1 });
    return res.json({
      success: true,
      tasks,
      count: tasks.length,
      userEmail: user.email,
    });
  } catch (err) {
    return sendServerError(res, err);
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { email } = req.body;
    const { id } = req.params;

    if (!email)
      return res
        .status(400)
        .json({ success: false, message: "Email is required." });

    if (!isValidObjectId(id))
      return res
        .status(400)
        .json({ success: false, message: "Invalid task id." });

    const user = await User.findOne({ email }).select("_id email");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found." });

    const task = await Task.findById(id);
    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task not found." });

    if (!task.userId || task.userId.toString() !== user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Task does not belong to user.",
      });
    }

    await Task.findByIdAndDelete(id);
    return res.json({
      success: true,
      message: "Task deleted.",
      userEmail: user.email,
    });
  } catch (err) {
    return sendServerError(res, err);
  }
};
