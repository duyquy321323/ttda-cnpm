const db = require("../db");

const deviceModel = {
    getTrainingData: async () => {
        try {

            // Lấy trạng thái hiện tại của cửa, đèn, quạt, relay
            /**
             * CREATE TABLE `devices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)

  CREATE TABLE `door` (
  `STT` int NOT NULL AUTO_INCREMENT,
  `device_id` int NOT NULL,
  `state` tinyint(1) NOT NULL DEFAULT '0',
  `changed_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`STT`),
  KEY `device_id` (`device_id`),
  CONSTRAINT `door_ibfk_1` FOREIGN KEY (`device_id`) REFERENCES `devices` (`id`) ON DELETE CASCADE

  CREATE TABLE `fan` (
  `STT` int NOT NULL AUTO_INCREMENT,
  `device_id` int NOT NULL,
  `speed` int NOT NULL,
  `changed_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`STT`),
  KEY `device_id` (`device_id`),
  CONSTRAINT `fan_ibfk_1` FOREIGN KEY (`device_id`) REFERENCES `devices` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fan_chk_1` CHECK ((`speed` between 0 and 100))

  CREATE TABLE `relay` (
  `STT` int NOT NULL AUTO_INCREMENT,
  `device_id` int NOT NULL,
  `state` tinyint(1) NOT NULL DEFAULT '0',
  `changed_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`STT`),
  KEY `device_id` (`device_id`),
  CONSTRAINT `relay_ibfk_1` FOREIGN KEY (`device_id`) REFERENCES `devices` (`id`) ON DELETE CASCADE

  CREATE TABLE `rgb_lights` (
  `STT` int NOT NULL AUTO_INCREMENT,
  `device_id` int NOT NULL,
  `auto` tinyint(1) NOT NULL DEFAULT '0',
  `color` varchar(20) NOT NULL,
  `timer_off` time DEFAULT NULL,
  `changed_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`STT`),
  KEY `device_id` (`device_id`),
  CONSTRAINT `rgb_lights_ibfk_1` FOREIGN KEY (`device_id`) REFERENCES `devices` (`id`) ON DELETE CASCADE
             */
            const queryDoor = `
                SELECT d.state FROM door d
                ORDER BY changed_at DESC, STT DESC
                LIMIT 1
            `;
            const queryFan = `
                SELECT f.speed FROM fan f
                ORDER BY changed_at DESC, STT DESC
                LIMIT 1
            `;
            const queryRelay = `
                SELECT r.state FROM relay r
                ORDER BY changed_at DESC, STT DESC
                LIMIT 1
            `;
            const queryLight = `
                SELECT l.auto, l.color, l.timer_off FROM rgb_lights l
                ORDER BY changed_at DESC, STT DESC
                LIMIT 1
            `;
            const query = `
                SELECT d.state AS door_state, f.speed AS fan_speed, r.state AS relay_state, l.auto AS light_auto, l.color AS light_color, l.timer_off AS light_timer_off
                FROM (${queryDoor}) d,
                     (${queryFan}) f,
                     (${queryRelay}) r,
                     (${queryLight}) l
            `;
            
            const result = await db.query(query);

            console.log("Training data:", result[0]);

            return Array.isArray(result[0])? result[0][result[0].length - 1]: result[0];
        } catch (error) {
            throw new Error(`Error fetching training data: ${error}`);
        }
    },
};

module.exports = deviceModel;
