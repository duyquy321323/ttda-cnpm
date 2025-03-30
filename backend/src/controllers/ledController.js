const ledService = require("../services/ledService");
const setLedState = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "Missing request body" });
        }

        const { color, auto, timer_off } = req.body;
        const updatedLED = await ledService.sendLedColor(color, auto, timer_off);
        res.json({ message: "Updated successfully", ledState: updatedLED });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { setLedState };