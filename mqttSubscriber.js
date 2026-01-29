const mqtt = require("mqtt");
const Sensor = require("./models/Sensor");
require("dotenv").config();
const connectDB = require("./config/db");

// Connect MongoDB
connectDB();

// Connect to MQTT broker
// const client = mqtt.connect("mqtt://broker.hivemq.com:1883");
const client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");

// Topic pattern
const topic = "iot/sensor/+/temperature";

client.on("connect", () => {
  console.log("MQTT connected");
  client.subscribe(topic, () => {
    console.log(`Subscribed to topic: ${topic}`);
  });
});

client.on("message", async (receivedTopic, message) => {
  try {
    /*
      Example topic:
      iot/sensor/sensor-01/temperature
    */
    const parts = receivedTopic.split("/");
    const deviceId = parts[2];
    const temperature = parseFloat(message.toString());

    if (isNaN(temperature)) {
      console.error("Invalid temperature value");
      return;
    }

    const sensorData = new Sensor({
      deviceId,
      temperature,
      timestamp: Date.now()
    });

    await sensorData.save();
    console.log(`MQTT data saved for ${deviceId}: ${temperature}`);
  } catch (error) {
    console.error("MQTT message error:", error.message);
  }
});
