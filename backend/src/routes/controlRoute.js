const express = require("express");
const controlController = require("../controllers/controlController");

const router = express.Router();

router.post("/", controlController.setControlState);

module.exports = router;