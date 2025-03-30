const db = require("../db");

const environmentModel = {
    async addDHTInfo({ temperature, humidity }) { //temperature and humidity
        const query = `
            INSERT INTO temperature_humidity_sensors (device_id, temperature, humidity)
            VALUES (2, ?, ?)
        `;
        await db.query(query, [temperature, humidity]);
        return { success: true };
    },

    async addlightInfo({ light_level }) { //light
        const query = `
            INSERT INTO light_sensors (device_id, light_level)
            VALUES (3, ?)
        `;
        await db.query(query, [light_level]);
        return { success: true };
    },
};

module.exports = environmentModel;