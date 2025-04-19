const db = require("../db");

const controlModel = {
    async addDoorState({ state, auto }) {
        const query = `
            INSERT INTO door (device_id, state, auto, changed_at)
            VALUES (5, ?, ?, NOW())
        `;
        await db.query(query, [state, auto]);
        return { success: true };
    },

    async addRelayState({ state }) {
        const query = `
            INSERT INTO relay (device_id, state, changed_at)
            VALUES (6, ?, NOW())
        `;
        await db.query(query, [state]);
        return { success: true };
    },

    async addFanState({ speed, auto }) {
        const query = `
            INSERT INTO fan (device_id, speed, auto, changed_at)
            VALUES (4, ?, ?, NOW())
        `;
        await db.query(query, [speed, auto]);
        return { success: true };
    },
    
};

module.exports = controlModel;
