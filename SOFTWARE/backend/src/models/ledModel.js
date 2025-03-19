const db = require("../db");

const ledModel = {
    async addLedState({ auto, color, timer_off }) {
        const query = `
            INSERT INTO rgb_lights (device_id, auto, color, timer_off)
            VALUES (1, ?, ?, ?)
        `;
        await db.query(query, [auto, color, timer_off]);
        return { success: true };
    },
};

module.exports = ledModel;