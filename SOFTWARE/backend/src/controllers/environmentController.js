const WebSocket = require("ws");
const environmentService = require("../services/environmentService");

const clients = new Set();

const getLatestData = (req, res) => {
    const data = environmentService.getLatestEnvironmentData();
    if (!data) {
        return res.status(500).json({ error: "Internal server error" });
    }
    res.json(data);
};

const setupWebSocket = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on("connection", (ws) => {
        console.log("New WebSocket connection established");
        clients.add(ws);
        ws.send(JSON.stringify(environmentService.getLatestEnvironmentData()));

        ws.on("close", () => {
            clients.delete(ws);
        });
    });
};

setInterval(() => {
    const latestData = environmentService.getLatestEnvironmentData();
    clients.forEach(ws => {
        if (ws.readyState === WebSocket.OPEN) {
            try {
                ws.send(JSON.stringify(latestData));
            } catch (error) {
                console.error("Error sending WebSocket message:", error);
            }
        }
    });
}, 500);

// Lấy nhiệt độ cách đây 24h 

const getTemperature24h = async (req, res) => {
    const data = await environmentService.getTemperature24h();
    if (!data) {
        return res.status(500).json({ error: "Internal server error" });
    }
    res.json(data);
}

// Lấy humidity cách đây 24h
const getHumidity24h = async (req, res) => {
    const data = await environmentService.getHumidity24h();
    if (!data) {
        return res.status(500).json({ error: "Internal server error" });
    }
    res.json(data);
}

// Lấy ánh sáng cách đây 24h
const getLight24h = async (req, res) => {
    const data = await environmentService.getLight24h();
    if (!data) {
        return res.status(500).json({ error: "Internal server error" });
    }
    res.json(data);
}

module.exports = { getLatestData, setupWebSocket, getTemperature24h, getHumidity24h, getLight24h };
