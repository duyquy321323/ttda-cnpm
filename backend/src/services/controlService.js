const mqtt = require("mqtt");
require("dotenv").config();
const controlModel = require("../models/controlModel");

const AIO_USERNAME = process.env.AIO_USERNAME;
const AIO_KEY = process.env.AIO_KEY;

const client = mqtt.connect(`mqtt://io.adafruit.com`, {
    username: AIO_USERNAME,
    password: AIO_KEY,
    reconnectPeriod: 5000,
});

const FEEDS = {
    fan: `${AIO_USERNAME}/feeds/MINI_FAN`,
    relay: `${AIO_USERNAME}/feeds/RELAY`,
    servo: `${AIO_USERNAME}/feeds/SERVO_DOOR`
};

const publishData = (feed, value) => {
    client.publish(feed, value.toString(), { qos: 1 }, (err) => {
        if (err) console.error(`Error publishing to ${feed}:`, err);
    });
};

const updateControlState = async (relay, fan, door) => {
    try {
        publishData(FEEDS.relay, relay ? "1" : "0");
        publishData(FEEDS.fan, fan.toString());
        publishData(FEEDS.servo, door ? "1" : "0");

        await controlModel.addDoorState({ state: door });
        await controlModel.addRelayState({ state: relay });
        await controlModel.addFanState({ speed: fan });

        return { relay, fan, door };
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
};

const updateDoorState = async (state) => {
    try {
        publishData(FEEDS.servo, state ? "1" : "0");
        await controlModel.addDoorState({ state });
        return { state };
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
};

const updateFanState = async (speed) => {
    try {
        publishData(FEEDS.fan, speed.toString());
        await controlModel.addFanState({ speed });
        return { speed };
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
};

const updateRelayState = async (state) => {
    try {
        publishData(FEEDS.relay, state ? "1" : "0");
        await controlModel.addRelayState({ state });
        return { state };
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
};

module.exports = { updateControlState, updateDoorState, updateFanState, updateRelayState };