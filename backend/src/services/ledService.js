const mqtt = require("mqtt");
require("dotenv").config();
const ledModel = require("../models/ledModel");

const AIO_USERNAME = process.env.AIO_USERNAME;
const AIO_KEY = process.env.AIO_KEY;
const client = mqtt.connect(`mqtt://io.adafruit.com`, {
    username: AIO_USERNAME,
    password: AIO_KEY,
    reconnectPeriod: 5000,
});

const LED_FEED = `${AIO_USERNAME}/feeds/${process.env.LED_FEED}`;
const AUTO_FEED = `${AIO_USERNAME}/feeds/${process.env.AUTO_FEED}`;
const TIME_OFF_FEED = `${AIO_USERNAME}/feeds/${process.env.TIME_OFF_FEED}`;

const COLOR_MAP = {
    blue: "#0000ff",
    white: "#ffffff",
    red: "#ff0000",
    black: "#000000",
    green: "#008000",
    yellow: "#ffff00",
    orange: "#ffa500",
    purple: "#800080",
};

const publishData = (feed, value) => {
    console.log(`Publishing to ${feed}: ${value}`);
    client.publish(feed, value.toString(), { qos: 1 }, (err) => {
        if (err) console.error(`Error publishing to ${feed}:`, err);
    });
};

const sendLedColor = async (color, auto, timer_off = null) => {
    const hexColor = COLOR_MAP[color.toLowerCase()];
    const autoChar = auto ? "1" : "0";
    const timerOffValue = timer_off ? timer_off : "NULL";

    try {
        publishData(LED_FEED, hexColor);
        publishData(AUTO_FEED, autoChar);
        publishData(TIME_OFF_FEED, timerOffValue);

        await ledModel.addLedState({
            auto: parseInt(autoChar),
            color: color,
            timer_off: timer_off,
        });
        return {color, auto, timer_off};
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
};

module.exports = { sendLedColor };

