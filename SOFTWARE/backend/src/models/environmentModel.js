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

    // Lấy nhiệt độ cách đây 24h
    async getTemperature24h() {
        const query = `
            SELECT temperature, recorded_at
            FROM temperature_humidity_sensors
            WHERE recorded_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
            ORDER BY recorded_at ASC
        `;
        const [rows] = await db.query(query);
        return rows;
    },

    // Lấy humidity cách đây 24h
    async getHumidity24h() {
        const query = `
            SELECT humidity, recorded_at
            FROM temperature_humidity_sensors
            WHERE recorded_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
            ORDER BY recorded_at ASC
        `;
        const [rows] = await db.query(query);
        return rows;
    },

    // Lấy ánh sáng cách đây 24h
    async getLight24h() {
        const query = `
            SELECT light_level, recorded_at
            FROM light_sensors
            WHERE recorded_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
            ORDER BY recorded_at ASC
        `;
        const [rows] = await db.query(query);
        return rows;
    }
};

module.exports = environmentModel;