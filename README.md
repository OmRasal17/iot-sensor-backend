# IoT Sensor Backend API

A Node.js backend service that ingests IoT sensor temperature readings, stores them in MongoDB Atlas, and exposes APIs to retrieve the latest sensor reading per device.  
The application also supports ingesting data via MQTT as a bonus feature.

This project was developed as part of a **Node.js Internship Pre-Assessment Assignment**.

---

## 🚀 Features

- REST API to ingest IoT sensor temperature data
- REST API to fetch the latest reading for a device
- MongoDB Atlas (Free Tier) integration using Mongoose
- Input validation and proper error handling
- Automatic timestamp assignment when not provided
- MQTT subscriber support for real-time sensor ingestion (Bonus)
- Clean and modular backend architecture

---

## 🛠 Tech Stack

- **Node.js** (18+ / 20 LTS recommended)
- **Express.js**
- **MongoDB Atlas (Free Tier)**
- **Mongoose**
- **MQTT.js**
- **dotenv**
- **nodemon**

---

## 📁 Project Structure

iot-sensor-backend/
│
├── config/
│ └── db.js
│
├── controllers/
│ └── sensorController.js
│
├── models/
│ └── Sensor.js
│
├── routes/
│ └── sensorRoutes.js
│
├── mqttSubscriber.js
├── server.js
├── .env
├── .gitignore
├── package.json
└── README.md



---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/OmRasal17/iot-sensor-backend.git
cd iot-sensor-backend
npm install
3️⃣ Configure Environment Variables

Create a .env file in the root directory:

PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string


⚠️ The .env file is excluded from version control using .gitignore.

4️⃣ Run the REST API Server
npm run dev


Server will start at:

http://localhost:5000

📌 API Endpoints
🔹 POST /api/sensor/ingest

Ingest IoT sensor temperature data via HTTP.

Request Body
{
  "deviceId": "sensor-01",
  "temperature": 32.1,
  "timestamp": 1705312440000
}


deviceId → required

temperature → required

timestamp → optional (defaults to current time)

Success Response (201)
{
  "message": "Sensor data ingested successfully",
  "data": {
    "_id": "...",
    "deviceId": "sensor-01",
    "temperature": 32.1,
    "timestamp": 1705312440000,
    "createdAt": "2026-01-29T..."
  }
}

🔹 GET /api/sensor/:deviceId/latest

Fetch the latest sensor reading for a given device.

Example Request
GET /api/sensor/sensor-01/latest

Success Response (200)
{
  "_id": "...",
  "deviceId": "sensor-01",
  "temperature": 32.1,
  "timestamp": 1705312440000,
  "createdAt": "2026-01-29T..."
}

Error Response (404)
{
  "message": "No data found for this device"
}

🧪 API Testing Examples
✅ Using curl
POST Sensor Data
curl -X POST http://localhost:5000/api/sensor/ingest \
  -H "Content-Type: application/json" \
  -d '{
    "deviceId": "sensor-01",
    "temperature": 32.1
  }'

GET Latest Sensor Data
curl http://localhost:5000/api/sensor/sensor-01/latest


🔔 MQTT Integration (Bonus)

The backend also supports ingesting IoT sensor temperature data via MQTT.

Broker Configuration

Broker: broker.hivemq.com

Port: 8884

Protocol: WebSocket (WSS)

Topic Format
iot/sensor/<deviceId>/temperature

Example
Topic: iot/sensor/sensor-02/temperature
Message: 28.5



PS C:\Users\2024o\iot-sensor-backend> Invoke-RestMethod `
>>   -Uri http://localhost:5000/api/sensor/sensor-mqtt-final/latest `
>>   -Method GET
>> 


_id         : 697bc02b74a7769a17237924
deviceId    : sensor-mqtt-final
temperature : 26.5
timestamp   : 1769717803807
createdAt   : 2026-01-29T20:16:43.811Z
__v         : 0


How It Works

The MQTT subscriber listens using a wildcard topic.

The device ID is extracted from the topic.

The temperature value is parsed from the message.

Data is stored in MongoDB using the same schema as the HTTP API.

Run MQTT Subscriber
node mqttSubscriber.js


Ensure MongoDB environment variables are configured before starting the subscriber.

📌 Notes

MongoDB Atlas Free Tier (M0) is used.

If timestamp is not provided, the server assigns the current time.

Latest sensor data is determined using timestamp-based sorting.

Compatible with Node.js 18+ or 20 LTS.

