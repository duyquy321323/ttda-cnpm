const express = require("express");
const router = express.Router();
const ledController = require("../controllers/ledController");

router.post("/", ledController.setLedState);

module.exports = router;
