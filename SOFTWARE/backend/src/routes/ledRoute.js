const express = require("express");
const router = express.Router();
const ledController = require("../controllers/ledController");

router.post("/", ledController.setLedState);
router.get("/", ledController.getLatestData);
module.exports = router;
