const express = require("express");
const router = express.Router();
const auth = require("../Middleware/auth");
const controller = require("../Controllers/cameraController");

router.post("/add", auth, controller.addCamera);
router.get("/", auth, controller.getCameras);
router.delete("/:id", auth, controller.deleteCamera);
router.put("/:id", auth, controller.updateCamera);

module.exports = router;
