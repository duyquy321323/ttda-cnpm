const deviceModel = require("../models/deviceModel.js");

getTrainingData = async () => {
    try {
        // Lấy trạng thái hiện tại của cửa, đèn, quạt, relay
        const trainingData = await deviceModel.getTrainingData();
        if (!trainingData) {
            throw new Error("No training data found");
        }
        return trainingData;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
};

module.exports = { getTrainingData };