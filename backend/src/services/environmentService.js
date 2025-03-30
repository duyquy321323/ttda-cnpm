const mqtt = require("mqtt");
const EnvironmentData = require("../models/environmentModel");

require("dotenv").config();



const AIO_USERNAME = process.env.AIO_USERNAME;
const AIO_KEY = process.env.AIO_KEY;

const client = mqtt.connect(`mqtt://io.adafruit.com`, {
    username: AIO_USERNAME,
    password: AIO_KEY,
    reconnectPeriod: 5000,
});

const FEEDS = {
    temperature: `${AIO_USERNAME}/feeds/${process.env.TEMP_FEED}`,
    humidity: `${AIO_USERNAME}/feeds/${process.env.HUMID_FEED}`,
    light: `${AIO_USERNAME}/feeds/${process.env.LIGHT_FEED}`,
};

let latestData = {
    temperature: null,
    humidity: null,
    light: null,
};

client.on("connect", () => {
    console.log("Connected to MQTT broker");
    client.subscribe(Object.values(FEEDS), (err) => {
        if (err) console.error("Failed to subscribe:", err);
    });
});

client.on("message", async (topic, message) => {
    const value = parseFloat(message.toString());

    if (topic === FEEDS.temperature) latestData.temperature = value;
    if (topic === FEEDS.humidity) latestData.humidity = value;
    if (topic === FEEDS.light) latestData.light = value;

    console.log("Updated Environment Data:", latestData);

    try {
        if (topic === FEEDS.temperature || topic === FEEDS.humidity) {
            await EnvironmentData.addDHTInfo({
                temperature: latestData.temperature,
                humidity: latestData.humidity,
            });
        }
        if (topic === FEEDS.light) {
            await EnvironmentData.addlightInfo({ light_level: latestData.light });
        }
    } catch (error) {
        console.error("Error saving data:", error);
    }
});

const getLatestEnvironmentData = () => latestData;

module.exports = { getLatestEnvironmentData };
