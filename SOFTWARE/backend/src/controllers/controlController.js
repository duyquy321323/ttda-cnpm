const controlService = require("../services/controlService");
const setControlState = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "Missing request body" });
        }

        const updatedState = await controlService.updateControlState(req.body);

        res.json({ message: "Updated successfully", controlState: updatedState });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getLatestData = (req, res) => {
    const data = controlService.getCurrentState();
    if (!data) {
        return res.status(500).json({ error: "Internal server error" });
    }
    res.json(data);
};

const setFanState = async (req, res) => {
    try {
        const { speed } = req.body;
        const updatedState = await controlService.updateFanState(speed);

        res.json({ message: "Updated successfully", fanState: updatedState });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

const setDoorState = async (req, res) => {
    try {
        const { state } = req.body;
        const updatedState = await controlService.updateDoorState(state);

        res.json({ message: "Updated successfully", doorState: updatedState });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

const setRelayState = async (req, res) => {
    try {
        const { state } = req.body;
        const updatedState = await controlService.updateRelayState(state);
        
        res.json({ message: "Updated successfully", relayState: updatedState });
    } catch (error) {
        console.error("Error in setRelayState:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
module.exports = { setControlState, getLatestData, setDoorState, setFanState, setRelayState };
