const db = require("../db");

const controlModel = {
    async addDoorState({ state }) {
        const query = `
            INSERT INTO door (device_id, state, changed_at)
            VALUES (5, ?, NOW())
        `;
        await db.query(query, [state]);
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

    async addFanState({ speed }) {
        const query = `
            INSERT INTO fan (device_id, speed, changed_at)
            VALUES (4, ?, NOW())
        `;
        await db.query(query, [speed]);
        return { success: true };
    },
};

module.exports = controlModel;
