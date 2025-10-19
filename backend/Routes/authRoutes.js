const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  resetPassword,
} = require("../Controllers/authController");
const {
  signupValidation,
  loginValidation,
  resetPasswordValidation,
} = require("../Middleware/authValidation");

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.post("/reset-password", resetPasswordValidation, resetPassword);

module.exports = router;
