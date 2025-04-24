const express = require("express");
const router = express.Router();
const { getTrainingData } = require("../controllers/deviceController");

router.get("/training", getTrainingData);

module.exports = router;