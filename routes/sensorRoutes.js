const express = require("express");
const router = express.Router();

const {
  ingestSensorData,
  getLatestSensorData
} = require("../controllers/sensorController");

router.post("/ingest", ingestSensorData);
router.get("/:deviceId/latest", getLatestSensorData);

module.exports = router;
