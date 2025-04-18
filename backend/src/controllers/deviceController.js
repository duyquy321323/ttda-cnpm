const deviceService = require("../services/deviceService.js");

const getTrainingData = async (req, res) => {
    try {
        // Lấy trạng thái hiện tại của cửa, đèn, quạt, relay
        const trainingData = await deviceService.getTrainingData();
        if (!trainingData) {
            return res.status(500).json({ error: "Internal server error" });
        }
        res.status(200).json(trainingData);
        
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { getTrainingData };