const mqtt = require("mqtt");
require("dotenv").config();
const controlModel = require("../models/controlModel");

const AIO_USERNAME = process.env.AIO_USERNAME;
const AIO_KEY = process.env.AIO_KEY;
const AIO_USERNAME1 = process.env.AIO_USERNAME1;
const AIO_KEY1 = process.env.AIO_KEY1;

const client = mqtt.connect(`mqtt://io.adafruit.com`, {
    username: AIO_USERNAME,
    password: AIO_KEY,
    reconnectPeriod: 5000,
});

const client1 = mqtt.connect(`mqtt://io.adafruit.com`, {
    username: AIO_USERNAME1,
    password: AIO_KEY1,
    reconnectPeriod: 5000,
});

const FEEDS = {
    fan: `${AIO_USERNAME}/feeds/MINI_FAN`,
    relay: `${AIO_USERNAME}/feeds/RELAY`,
    servo: `${AIO_USERNAME}/feeds/SERVO_DOOR`
};

const FEEDS1 = {
    autoFan: `${AIO_USERNAME1}/feeds/AUTO_FAN`,
    autoDoor: `${AIO_USERNAME1}/feeds/AUTO_DOOR`
}

const publishData = (client, feed, value) => {
    console.log(`Publishing to ${feed}: ${value}`);
    client.publish(feed, value.toString(), { qos: 1 }, (err) => {
        if (err) console.error(`Error publishing to ${feed}:`, err);
    });
};
let prevdoor = "0";
let prevspeed = 0;
let prevAutoDoor = 0;
let prevAutoFan = 0;
let prevRelay = 0
const updateControlState = async ({ relay, fan, door, autoDoor, autoFan }) => {
    if (door !== undefined){
        prevdoor = (door == 1) ? "1" : "0";
    }
    if (fan !== undefined){
        prevspeed = fan;
    }
    if (autoDoor !== undefined){
        prevAutoDoor = autoDoor;    
    }
    if (autoFan !== undefined){
        prevAutoFan = autoFan;
    }
    if (relay !== undefined){
        prevRelay = relay;
    }
    try {
        if (relay !== undefined) {
            publishData(client, FEEDS.relay, relay ? "1" : "0");
            await controlModel.addRelayState({ state: relay });
        }

        if (fan !== undefined) {
            publishData(client, FEEDS.fan, fan.toString());
            await controlModel.addFanState({ speed: fan, auto: 0 });
            if (prevAutoFan == 1){
                setTimeout(async () => {
                    await controlModel.addFanState({ speed: fan, auto: 1 });
                }, 30000);
            }
        }

        if (door !== undefined) {
            publishData(client, FEEDS.servo, door ? "1" : "0");
            await controlModel.addDoorState({ state: door, auto: 0 });
            if (prevAutoDoor == 1){
                setTimeout(async () => {
                    await controlModel.addDoorState({ state: (door == 1) ? 1 : 0, auto: 1 });
                }, 30000);
            }
        }

        if (autoDoor !== undefined) {
            if (door === undefined) {
                publishData(client1, FEEDS1.autoDoor, autoDoor ? "1" : "0");
            }
            await controlModel.addDoorState({ 
                state: prevdoor !== null ? parseInt(prevdoor) : 0, 
                auto: autoDoor ? 1 : 0 
            });
        }

        if (autoFan !== undefined) {
            if (fan === undefined) {
                publishData(client1, FEEDS1.autoFan, autoFan ? "1" : "0");
            }
            await controlModel.addFanState({  
                speed: prevspeed !== undefined ? prevspeed : 0, 
                auto: autoFan ? 1 : 0 
            });
        }

        return { relay, fan, door, autoDoor, autoFan };
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
};

const updateDoorState = async (state) => {
    try {
        publishData(client, FEEDS.servo, state ? "1" : "0");
        await controlModel.addDoorState({ state, auto: prevAutoDoor });
        return { state };
    } catch (error) {
        throw new Error(`Error updating door state: ${error}`);
    }
};

const updateFanState = async (speed) => {
    try {
        publishData(client, FEEDS.fan, speed.toString());
        await controlModel.addFanState({ speed, auto: prevAutoFan });
        return { speed };
    } catch (error) {
        throw new Error(`Error updating fan state: ${error}`);
    }
};

const updateRelayState = async (state) => {
    try {
        publishData(client, FEEDS.relay, state ? "1" : "0");
        await controlModel.addRelayState({ state });
        return { state };
    } catch (error) {
        throw new Error(`Error updating relay state: ${error}`);
    }
};

const clients = new Set();

function pushRealtimeDataToClients(data) {
    clients.forEach(ws => {
        if (ws.readyState === 1) {
            ws.send(JSON.stringify(data));
        }
    });
}

client.on("connect", () => {
    client.subscribe([FEEDS.fan, FEEDS.servo, FEEDS.relay], (err) => {
        if (err) console.error("Subscribe error:", err);
        else console.log("Subscribed to fan, relay and servo feeds");
    });
});

client1.on("connect", () => {
    client1.subscribe([FEEDS1.autoFan, FEEDS1.autoDoor], (err) => {
        if (err) console.error("Subscribe error:", err);
        else console.log("Subscribed to autoFan and autoDoor feeds");
    });
});

client.on("message", async (topic, message) => {
    const value = message.toString();
    console.log(`Received on ${topic}: ${value}`);

    if (topic === FEEDS.fan) {
        prevspeed = parseInt(value);
        await controlModel.addFanState({ speed: value, auto: prevAutoFan });
        pushRealtimeDataToClients(value); 
    }
    if (topic === FEEDS.servo) {
        prevdoor = value;
        await controlModel.addDoorState({ state: parseInt(value), auto: prevAutoDoor });
        pushRealtimeDataToClients(value); 
    }
    if (topic === FEEDS.relay) {
        prevRelay = value;
        await controlModel.addRelayState({ state: parseInt(prevRelay)});
        pushRealtimeDataToClients(value); 
    }
});

client1.on("message", async (topic, message) => {
    const value = message.toString();
    console.log(`Received on ${topic}: ${value}`);

    if (topic === FEEDS1.autoFan) {
        prevAutoFan = parseInt(value);
        await controlModel.addFanState({ speed: value, auto: prevAutoFan });
        pushRealtimeDataToClients(value); 
    }

    if (topic === FEEDS1.autoDoor) {
        prevAutoDoor = parseInt(value);
        await controlModel.addDoorState({ state: parseInt(value), auto: prevAutoDoor });
        pushRealtimeDataToClients(value); 
    }
});

module.exports = { updateControlState, getCurrentState: () => ({
    fan: prevspeed,
    door: parseInt(prevdoor),
    autoFan: prevAutoFan,
    autoDoor: prevAutoDoor,
    relay: parseInt(prevRelay)
}), updateDoorState, updateFanState, updateRelayState };


