const express = require("express");
const controlController = require("../controllers/controlController");

const router = express.Router();

router.post("/", controlController.setControlState);

router.post("/door", controlController.setDoorState);

router.post("/fan", controlController.setFanState);

router.post("/relay", controlController.setRelayState);

module.exports = router;