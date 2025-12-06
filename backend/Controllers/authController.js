const UserModel = require("../Models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Camera = require("../Models/camera");
const Event = require("../Models/Event");
const Task = require("../Models/Task");
const Staff = require("../Models/Staff");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User already exists, please login",
        success: false,
      });
    }
    const userModel = new UserModel({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res.status(201).json({
      message: "Signup successful",
      success: true,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const errorMsg = "Authentication failed: email or password is incorrect";
    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "4h" }
    );

    res.cookie("token", jwtToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // use true only in https
    });
    res.status(200).json({
      message: "Login successful",
      success: true,
      jwtToken,
      email,
      name: user.name,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
      success: false,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({
      message: "Password updated successfully",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const updateUserDetails = async (req, res) => {
  try {
    const { email, newName, newEmail } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ message: "User email is required.", success: false });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    if (newEmail && newEmail !== email) {
      const existingUser = await UserModel.findOne({ email: newEmail });
      if (existingUser) {
        return res
          .status(409)
          .json({ message: "New email is already in use.", success: false });
      }
      user.email = newEmail;
    }

    if (newName) {
      user.name = newName;
    }

    await user.save();

    res.status(200).json({
      message: "User details updated successfully",
      success: true,
      user: { name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Update user details error:", err);
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
      success: false,
    });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ message: "User email is required.", success: false });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }
    await Camera.deleteMany({ userId: user._id });
    await Event.deleteMany({ userId: user._id });
    await Task.deleteMany({ userId: user._id });
    await Staff.deleteMany({ userId: user._id });

    const userDeletion = await UserModel.deleteOne({ _id: user._id });

    if (userDeletion.deletedCount === 0) {
      return res.status(404).json({
        message: "User not found during deletion.",
        success: false,
      });
    }

    res.status(200).json({
      message: "User and associated data deleted successfully",
      success: true,
    });
  } catch (err) {
    console.error("Delete account error:", err);
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
      success: false,
    });
  }
};

module.exports = {
  signup,
  login,
  resetPassword,
  updateUserDetails,
  deleteAccount,
};
