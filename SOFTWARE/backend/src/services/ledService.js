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

let justPublished = false;

const publishData = (feed, value) => {
    if (value === undefined) return;

    const stringValue = value === null ? "null" : value.toString();
    console.log(`Publishing to ${feed}: ${stringValue}`);

    justPublished = true;
    setTimeout(() => justPublished = false, 500); // Sau 500ms cho phép nhận lại MQTT

    client.publish(feed, stringValue, { qos: 1 }, (err) => {
        if (err) console.error(`Error publishing to ${feed}:`, err);
    });
};
let prevcolor = "black";
let prevauto = 0;
let prevtime = "00:00";
let hexColor;
const getColorNameFromHex = (hex) => {
    for (const [name, code] of Object.entries(COLOR_MAP)) {
        if (code.toLowerCase() === hex.toLowerCase()) {
            return name;
        }
    }
    return null; 
};
const sendLedColor = async ({color, auto, timer_off = null}) => {
    if (color !== undefined) {
        prevcolor = color;
        hexColor = COLOR_MAP[color.toLowerCase()];
    }

    if (auto !== undefined) {
        prevauto = auto;
    }
    if (timer_off !== undefined){
        prevtime = timer_off;
    }
    try {
        if (prevcolor !== undefined) {
            publishData(LED_FEED, hexColor);
        }

        if (auto !== undefined) {
            const autoChar = prevauto ? "1" : "0";
            publishData(AUTO_FEED, autoChar);
        }
        publishData(TIME_OFF_FEED, prevtime ? prevtime.toString() : null);
        if (prevauto == 1) {
            await ledModel.addLedState({ auto: 0, color: prevcolor, timer_off: prevtime });
            setTimeout(async () => {
                await ledModel.addLedState({ auto: 1, color: prevcolor, timer_off: prevtime });
            }, 30000);
        }
        else{
            await ledModel.addLedState({
                auto: 0,
                color: prevcolor,
                timer_off: prevtime,
            });
        }

        return { color: prevcolor, auto: prevauto, timer_off: prevtime };
    } catch (error) {
        throw new Error(`Error: ${error}`);
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
    client.subscribe([LED_FEED, AUTO_FEED], (err) => {
        if (err) console.error("Subscribe error:", err);
        else console.log("Subscribed to led feeds");
    });
});

client.on("message", async (topic, message) => {
    if (justPublished) return; 
    const value = message.toString();
    console.log(`Received on ${topic}: ${value}`);

    if (topic === LED_FEED) {
        prevcolor = getColorNameFromHex(value);
        if (prevauto !== undefined && !isNaN(parseInt(prevauto)) &&  prevcolor !== undefined) {
            await ledModel.addLedState({ auto: 0, color: prevcolor, timer_off: prevtime,});
            if ( parseInt(prevauto) === 1){
                setTimeout(async () => {
                    await ledModel.addLedState({ auto: 1, color: prevcolor, timer_off: prevtime,})
                }, 30000);
            }
        }
        pushRealtimeDataToClients(value); 
    }
    if (topic === AUTO_FEED) {
        prevauto = value;
        prevauto = parseInt(value);
        if (prevauto !== undefined && !isNaN(parseInt(prevauto && prevcolor !== undefined))) {
            await ledModel.addLedState({ auto: parseInt(prevauto), color: prevcolor, timer_off: prevtime,});
        }
        pushRealtimeDataToClients(value); 
    }
    
});

module.exports = { sendLedColor, getCurrentLedState: () => ({
    auto: prevauto,
    color: prevcolor,
    timer_off: prevtime,
})};

