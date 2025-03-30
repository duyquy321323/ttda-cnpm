const express = require("express");
const router = express.Router();
const { getLatestData } = require("../controllers/environmentController");

router.get("/", getLatestData);

module.exports = router;