const express = require("express");
const router = express.Router();
const auth = require("../Middleware/auth.js");
const authController = require("../Controllers/profileController.js");

const {
  signup,
  login,
  resetPassword,
  updateUserDetails,
  deleteAccount,
} = require("../Controllers/authController");
const {
  signupValidation,
  loginValidation,
  resetPasswordValidation,
} = require("../Middleware/authValidation");
router.get("/me", auth, async (req, res) => {
  res.json(req.user);
});
router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.post("/reset-password", resetPasswordValidation, resetPassword);
router.post("/update", updateUserDetails);
router.delete("/delete", deleteAccount);

module.exports = router;
