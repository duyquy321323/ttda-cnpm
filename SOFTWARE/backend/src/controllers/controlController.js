const controlService = require("../services/controlService");

const setControlState = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: "Missing request body" });
        }
        const { relay, fan, door } = req.body;
        const updatedState = await controlService.updateControlState(relay, fan, door);

        res.json({ message: "Updated successfully", controlState: updatedState });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { setControlState };
