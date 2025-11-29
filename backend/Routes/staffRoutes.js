const express = require("express");
const router = express.Router();

const { addStaff, getStaffs } = require("../Controllers/staffController");

router.post("/add-staff", addStaff);
router.get("/staffs", getStaffs);

module.exports = router;
