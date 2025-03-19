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
}, 30000);

module.exports = { getLatestData, setupWebSocket };
