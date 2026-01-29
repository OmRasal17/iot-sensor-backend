const Sensor = require("../models/Sensor");

exports.ingestSensorData = async (req, res) => {
  try {
    const { deviceId, temperature, timestamp } = req.body;

    // Validation
    if (!deviceId || temperature === undefined) {
      return res.status(400).json({
        message: "deviceId and temperature are required"
      });
    }

    const sensorData = new Sensor({
      deviceId,
      temperature,
      timestamp: timestamp || Date.now()
    });

    await sensorData.save();

    res.status(201).json({
      message: "Sensor data ingested successfully",
      data: sensorData
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};
exports.getLatestSensorData = async (req, res) => {
  try {
    const { deviceId } = req.params;

    const latestData = await Sensor.findOne({ deviceId })
      .sort({ timestamp: -1 });

    if (!latestData) {
      return res.status(404).json({
        message: "No data found for this device"
      });
    }

    res.status(200).json(latestData);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};
