const express = require("express");
const router = express.Router();
const auth = require("../Middleware/auth");
const controller = require("../Controllers/cameraController");

router.post("/add", controller.addCamera);
router.post("/get", controller.getCameras);
router.delete("/:id", controller.deleteCamera);
router.put("/:id", controller.updateCamera);

module.exports = router;
