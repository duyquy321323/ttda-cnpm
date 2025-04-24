const mqtt = require("mqtt");
const EnvironmentData = require("../models/environmentModel");

require("dotenv").config();



const AIO_USERNAME1 = process.env.AIO_USERNAME1;
const AIO_KEY1 = process.env.AIO_KEY1;

const client1 = mqtt.connect(`mqtt://io.adafruit.com`, {
    username: AIO_USERNAME1,
    password: AIO_KEY1,
    reconnectPeriod: 5000,
});

const FEEDS = {
    temperature: `${AIO_USERNAME1}/feeds/${process.env.TEMP_FEED}`,
    humidity: `${AIO_USERNAME1}/feeds/${process.env.HUMID_FEED}`,
    light: `${AIO_USERNAME1}/feeds/${process.env.LIGHT_FEED}`,
};

let latestData = {
    temperature: null,
    humidity: null,
    light: null,
};

client1.on("connect", () => {
    console.log("Connected to MQTT broker");
    client1.subscribe(Object.values(FEEDS), (err) => {
        if (err) console.error("Failed to subscribe:", err);
    });
});

client1.on("message", async (topic, message) => {
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

// lấy nhiệt độ cách đây 24h
const getTemperature24h = async () => {
    const data = await EnvironmentData.getTemperature24h();
    return data;
};

// Lấy humidity cách đây 24h
const getHumidity24h = async () => {
    const data = await EnvironmentData.getHumidity24h();
    return data;
};

// Lấy ánh sáng cách đây 24h
const getLight24h = async () => {
    const data = await EnvironmentData.getLight24h();
    return data;
};

module.exports = { getLatestEnvironmentData, getTemperature24h, getHumidity24h, getLight24h };
