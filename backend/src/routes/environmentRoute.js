const express = require("express");
const router = express.Router();
const { getLatestData, getTemperature24h, getHumidity24h, getLight24h } = require("../controllers/environmentController");

router.get("/", getLatestData);

router.get("/temperature-24h", getTemperature24h);

router.get("/humidity-24h", getHumidity24h);

router.get("/light-24h", getLight24h);

module.exports = router;