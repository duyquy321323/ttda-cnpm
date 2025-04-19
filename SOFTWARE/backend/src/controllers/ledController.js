const ledService = require("../services/ledService");
const WebSocket = require("ws");
const clients = new Set();
const setLedState = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "Missing request body" });
        }

        const updatedLED = await ledService.sendLedColor(req.body);
        res.json({ message: "Updated successfully", ledState: updatedLED });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getLatestData = (req, res) => {
    const data = ledService.getCurrentLedState();
    if (!data) {
        return res.status(500).json({ error: "Internal server error" });
    }
    res.json(data);
};


module.exports = { setLedState, getLatestData};