CREATE TABLE devices (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,  
    type VARCHAR(50) NOT NULL 
);

CREATE TABLE rgb_lights (
    STT INT PRIMARY KEY AUTO_INCREMENT,
    device_id INT NOT NULL,
    auto BOOLEAN NOT NULL DEFAULT FALSE,  
    color VARCHAR(20) NOT NULL,    
    timer_off TIME DEFAULT NULL,  
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE CASCADE
);

CREATE TABLE temperature_humidity_sensors (
    STT INT PRIMARY KEY AUTO_INCREMENT,
    device_id INT NOT NULL,  
    temperature FLOAT NOT NULL,  
    humidity FLOAT NOT NULL,  
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE CASCADE
);
CREATE TABLE light_sensors (
    STT INT PRIMARY KEY AUTO_INCREMENT,
    device_id INT NOT NULL,  
    light_level FLOAT NOT NULL,  
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE CASCADE
);

CREATE TABLE relay (
    STT INT PRIMARY KEY AUTO_INCREMENT,
    device_id INT NOT NULL,  
    state BOOLEAN NOT NULL DEFAULT FALSE,  
    FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE CASCADE
);

CREATE TABLE door (
    STT INT PRIMARY KEY AUTO_INCREMENT,
    device_id INT NOT NULL,  
    state BOOLEAN NOT NULL DEFAULT FALSE,  
    FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE CASCADE
);


CREATE TABLE fan (
    STT INT PRIMARY KEY AUTO_INCREMENT,
    device_id INT NOT NULL,  
    speed INT NOT NULL CHECK (speed BETWEEN 0 AND 100),  
    FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE CASCADE
);

INSERT INTO devices (name, type) 
VALUES 
('RGB Light', 'rgb_lights'),
('Tem-Hum Sensor', 'temperature_humidity_sensor'),
('Light Sensor', 'light_sensor'),
('Fan', 'mini_fan'),
('Door', 'door'),
('Relay', 'relay');

SHOW TABLES;