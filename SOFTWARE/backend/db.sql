-- MySQL dump 10.13  Distrib 8.0.41, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: yolohome
-- ------------------------------------------------------
-- Server version	8.0.41-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `devices`
--
unlock tables;
DROP TABLE IF EXISTS `devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `devices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devices`
--

LOCK TABLES `devices` WRITE;
/*!40000 ALTER TABLE `devices` DISABLE KEYS */;
INSERT INTO `devices` VALUES (1,'RGB Light','rgb_lights'),(2,'Tem-Hum Sensor','temperature_humidity_sensor'),(3,'Light Sensor','light_sensor'),(4,'Fan','mini_fan'),(5,'Door','door'),(6,'Relay','relay');
/*!40000 ALTER TABLE `devices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `door`
--

DROP TABLE IF EXISTS `door`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `door` (
  `STT` int NOT NULL AUTO_INCREMENT,
  `device_id` int NOT NULL,
  `state` tinyint(1) NOT NULL DEFAULT '0',
  `auto` tinyint(1) NOT NULL DEFAULT '0',
  `changed_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`STT`),
  KEY `device_id` (`device_id`),
  CONSTRAINT `door_ibfk_1` FOREIGN KEY (`device_id`) REFERENCES `devices` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `door`
--

LOCK TABLES `door` WRITE;
/*!40000 ALTER TABLE `door` DISABLE KEYS */;
INSERT INTO `door` VALUES (9,5,1,1,'2025-03-30 15:46:55'),(10,5,0,1,'2025-03-30 15:46:56'),(11,5,1,1,'2025-03-30 15:46:59'),(12,5,0,1,'2025-03-30 15:46:59'),(13,5,1,1,'2025-03-30 15:46:59'),(14,5,1,1,'2025-03-30 15:47:01'),(15,5,1,1,'2025-03-30 18:25:54'),(16,5,1,1,'2025-03-30 18:25:57');
/*!40000 ALTER TABLE `door` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fan`
--

DROP TABLE IF EXISTS `fan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fan` (
  `STT` int NOT NULL AUTO_INCREMENT,
  `device_id` int NOT NULL,
  `speed` int NOT NULL,
  `auto` tinyint(1) NOT NULL DEFAULT '0',
  `changed_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`STT`),
  KEY `device_id` (`device_id`),
  CONSTRAINT `fan_ibfk_1` FOREIGN KEY (`device_id`) REFERENCES `devices` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fan_chk_1` CHECK ((`speed` between 0 and 100))
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fan`
--

LOCK TABLES `fan` WRITE;
/*!40000 ALTER TABLE `fan` DISABLE KEYS */;
INSERT INTO `fan` VALUES (1,4,23,1,'2025-03-30 15:46:55'),(2,4,23,1,'2025-03-30 15:46:56'),(3,4,21,1,'2025-03-30 15:46:59'),(4,4,21,1,'2025-03-30 15:46:59'),(5,4,21,1,'2025-03-30 15:46:59'),(6,4,45,1,'2025-03-30 15:47:01'),(7,4,50,1,'2025-03-30 18:25:54'),(8,4,76,1,'2025-03-30 18:25:57');
/*!40000 ALTER TABLE `fan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `light_sensors`
--

DROP TABLE IF EXISTS `light_sensors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `light_sensors` (
  `STT` int NOT NULL AUTO_INCREMENT,
  `device_id` int NOT NULL,
  `light_level` float NOT NULL,
  `recorded_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`STT`),
  KEY `device_id` (`device_id`),
  CONSTRAINT `light_sensors_ibfk_1` FOREIGN KEY (`device_id`) REFERENCES `devices` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `light_sensors`
--

LOCK TABLES `light_sensors` WRITE;
/*!40000 ALTER TABLE `light_sensors` DISABLE KEYS */;
INSERT INTO `light_sensors` VALUES (9,3,977,'2025-03-30 15:48:25'),(10,3,949,'2025-03-30 15:48:30'),(11,3,461,'2025-03-30 15:48:35'),(12,3,372,'2025-03-30 15:48:40');
/*!40000 ALTER TABLE `light_sensors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `otp`
--

DROP TABLE IF EXISTS `otp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `otp` (
  `email` varchar(255) NOT NULL,
  `code` varchar(45) NOT NULL,
  `expiry_time` datetime NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `otp`
--

LOCK TABLES `otp` WRITE;
/*!40000 ALTER TABLE `otp` DISABLE KEYS */;
INSERT INTO `otp` VALUES ('daoduyquylop97@gmail.com','402217','2025-03-31 00:57:38');
/*!40000 ALTER TABLE `otp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relay`
--

DROP TABLE IF EXISTS `relay`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `relay` (
  `STT` int NOT NULL AUTO_INCREMENT,
  `device_id` int NOT NULL,
  `state` tinyint(1) NOT NULL DEFAULT '0',
  `changed_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`STT`),
  KEY `device_id` (`device_id`),
  CONSTRAINT `relay_ibfk_1` FOREIGN KEY (`device_id`) REFERENCES `devices` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relay`
--

LOCK TABLES `relay` WRITE;
/*!40000 ALTER TABLE `relay` DISABLE KEYS */;
INSERT INTO `relay` VALUES (1,6,1,'2025-03-30 15:46:55'),(2,6,1,'2025-03-30 15:46:56'),(3,6,1,'2025-03-30 15:46:59'),(4,6,1,'2025-03-30 15:46:59'),(5,6,0,'2025-03-30 15:46:59'),(6,6,0,'2025-03-30 15:47:01'),(7,6,0,'2025-03-30 18:25:54'),(8,6,0,'2025-03-30 18:25:57');
/*!40000 ALTER TABLE `relay` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rgb_lights`
--

DROP TABLE IF EXISTS `rgb_lights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rgb_lights`
--

LOCK TABLES `rgb_lights` WRITE;
/*!40000 ALTER TABLE `rgb_lights` DISABLE KEYS */;
INSERT INTO `rgb_lights` VALUES (1,1,1,'black','00:00:00','2025-03-30 19:19:21'),(2,1,1,'white','00:00:00','2025-03-30 19:19:23'),(3,1,1,'orange','00:00:00','2025-03-30 19:19:24'),(4,1,1,'blue','00:00:00','2025-03-30 19:19:27'),(5,1,1,'yellow','00:00:00','2025-03-30 19:19:29'),(6,1,1,'orange','00:00:00','2025-03-30 19:19:33'),(7,1,1,'orange','12:34:00','2025-03-30 19:19:35'),(8,1,1,'orange','12:34:00','2025-03-30 19:19:58'),(9,1,1,'orange','12:34:00','2025-03-30 19:20:05'),(10,1,1,'orange','12:34:00','2025-03-30 19:20:22'),(11,1,1,'orange','12:34:00','2025-03-30 19:20:22'),(12,1,1,'black','12:34:00','2025-03-30 19:20:23'),(13,1,1,'black','12:34:00','2025-03-30 19:20:25'),(14,1,1,'black','12:34:00','2025-03-30 19:20:25'),(15,1,1,'black','12:34:00','2025-03-30 19:20:25'),(16,1,1,'black','12:34:00','2025-03-30 19:20:26'),(17,1,1,'black','12:34:00','2025-03-30 19:20:26'),(18,1,1,'black','12:34:00','2025-03-30 19:20:26'),(19,1,1,'black','12:34:00','2025-03-30 19:20:26'),(20,1,1,'black','12:34:00','2025-03-30 19:20:27'),(21,1,1,'black','12:34:00','2025-03-30 19:20:27'),(22,1,1,'black','12:34:00','2025-03-30 19:20:53'),(23,1,1,'black','12:34:00','2025-03-30 19:20:53'),(24,1,1,'black','12:34:00','2025-03-30 19:20:53'),(25,1,1,'black','12:34:00','2025-03-30 19:20:53'),(26,1,1,'black','12:34:00','2025-03-30 19:20:54'),(27,1,1,'black','12:34:00','2025-03-30 19:20:54'),(28,1,1,'black','12:34:00','2025-03-30 19:20:54'),(29,1,1,'black','12:34:00','2025-03-30 19:20:55'),(30,1,1,'black','12:34:00','2025-03-30 19:20:55'),(31,1,1,'black','12:34:00','2025-03-30 19:20:55'),(32,1,1,'black','12:34:00','2025-03-30 19:20:55'),(33,1,1,'black','12:34:00','2025-03-30 19:20:55'),(34,1,1,'black','12:34:00','2025-03-30 19:20:55'),(35,1,1,'white','12:03:00','2025-03-30 19:21:04'),(36,1,1,'white','12:03:00','2025-03-30 19:21:04'),(37,1,1,'white','12:31:00','2025-03-30 19:21:05'),(38,1,1,'white','12:31:00','2025-03-30 19:21:06'),(39,1,1,'white','12:31:00','2025-03-30 19:21:06'),(40,1,1,'white','12:31:00','2025-03-30 19:21:06'),(41,1,1,'white','12:31:00','2025-03-30 19:21:07'),(42,1,1,'white','12:31:00','2025-03-30 19:21:07'),(43,1,1,'white','12:31:00','2025-03-30 19:21:07'),(44,1,1,'white','12:31:00','2025-03-30 19:21:08'),(45,1,1,'white','12:31:00','2025-03-30 19:21:08'),(46,1,1,'white','12:31:00','2025-03-30 19:21:08'),(47,1,1,'white','12:31:00','2025-03-30 19:21:08'),(48,1,1,'white','12:31:00','2025-03-30 19:21:08'),(49,1,1,'white','12:31:00','2025-03-30 19:21:08'),(50,1,1,'white','12:31:00','2025-03-30 19:21:09'),(51,1,1,'white','12:31:00','2025-03-30 19:21:09'),(52,1,1,'white','12:31:00','2025-03-30 19:21:09'),(53,1,1,'white','12:31:00','2025-03-30 19:21:09'),(54,1,1,'white','12:31:00','2025-03-30 19:21:09'),(55,1,1,'white','12:31:00','2025-03-30 19:21:09'),(56,1,1,'white','12:31:00','2025-03-30 19:21:09'),(57,1,1,'white','12:31:00','2025-03-30 19:21:09'),(58,1,1,'white','12:31:00','2025-03-30 19:21:09'),(59,1,1,'white','12:31:00','2025-03-30 19:21:09'),(60,1,1,'white','12:31:00','2025-03-30 19:21:09'),(61,1,1,'white','12:31:00','2025-03-30 19:21:09'),(62,1,1,'white','12:31:00','2025-03-30 19:21:10'),(63,1,1,'white','12:31:00','2025-03-30 19:21:10'),(64,1,1,'white','12:31:00','2025-03-30 19:21:10'),(65,1,1,'white','12:31:00','2025-03-30 19:21:10'),(66,1,1,'white','12:31:00','2025-03-30 19:21:10'),(67,1,1,'white','12:31:00','2025-03-30 19:21:10'),(68,1,1,'white','12:31:00','2025-03-30 19:21:10'),(69,1,1,'white','12:31:00','2025-03-30 19:21:10'),(70,1,1,'white','12:31:00','2025-03-30 19:21:10'),(71,1,1,'white','12:31:00','2025-03-30 19:21:15'),(72,1,1,'white','12:31:00','2025-03-30 19:21:15'),(73,1,1,'white','12:31:00','2025-03-30 19:21:15'),(74,1,1,'white','12:31:00','2025-03-30 19:21:15'),(75,1,1,'white','12:31:00','2025-03-30 19:21:16'),(76,1,1,'white','12:31:00','2025-03-30 19:21:16'),(77,1,1,'white','12:31:00','2025-03-30 19:21:16'),(78,1,1,'white','12:31:00','2025-03-30 19:21:23'),(79,1,1,'white','12:31:00','2025-03-30 19:21:23'),(80,1,1,'white','12:31:00','2025-03-30 19:21:23'),(81,1,1,'white','12:31:00','2025-03-30 19:22:03'),(82,1,1,'white','12:31:00','2025-03-30 19:22:04'),(83,1,1,'white','12:31:00','2025-03-30 19:22:06'),(84,1,1,'white','12:31:00','2025-03-30 19:22:06'),(85,1,1,'white','12:31:00','2025-03-30 19:22:06'),(86,1,1,'white','12:31:00','2025-03-30 19:22:06'),(87,1,1,'white','12:31:00','2025-03-30 19:22:06'),(88,1,1,'white','12:31:00','2025-03-30 19:22:06'),(89,1,1,'white','12:31:00','2025-03-30 19:22:06'),(90,1,1,'white','12:31:00','2025-03-30 19:22:07'),(91,1,1,'white','12:31:00','2025-03-30 19:22:07'),(92,1,1,'white','12:31:00','2025-03-30 19:22:07'),(93,1,1,'white','12:31:00','2025-03-30 19:22:15'),(94,1,1,'black','12:03:00','2025-03-30 19:22:25'),(95,1,1,'green','12:03:00','2025-03-30 19:22:25'),(96,1,0,'green','12:03:00','2025-03-30 19:22:47'),(97,1,1,'green','12:03:00','2025-03-30 19:22:59'),(98,1,1,'black','12:03:00','2025-03-30 19:23:07'),(99,1,0,'black','01:00:00','2025-03-30 19:25:58'),(100,1,0,'white','01:00:00','2025-03-30 19:25:59');
/*!40000 ALTER TABLE `rgb_lights` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `role_id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'USER');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `temperature_humidity_sensors`
--

DROP TABLE IF EXISTS `temperature_humidity_sensors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `temperature_humidity_sensors` (
  `STT` int NOT NULL AUTO_INCREMENT,
  `device_id` int NOT NULL,
  `temperature` float NOT NULL,
  `humidity` float NOT NULL,
  `recorded_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`STT`),
  KEY `device_id` (`device_id`),
  CONSTRAINT `temperature_humidity_sensors_ibfk_1` FOREIGN KEY (`device_id`) REFERENCES `devices` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `temperature_humidity_sensors`
--

LOCK TABLES `temperature_humidity_sensors` WRITE;
/*!40000 ALTER TABLE `temperature_humidity_sensors` DISABLE KEYS */;
INSERT INTO `temperature_humidity_sensors` VALUES (16,2,28.85,43.14,'2025-03-30 15:48:25'),(17,2,20.99,43.14,'2025-03-30 15:48:29'),(18,2,20.99,52.49,'2025-03-30 15:48:30'),(19,2,24.61,52.49,'2025-03-30 15:48:34'),(20,2,24.61,59.53,'2025-03-30 15:48:35'),(21,2,22.79,59.53,'2025-03-30 15:48:39'),(22,2,22.79,44.98,'2025-03-30 15:48:40');
/*!40000 ALTER TABLE `temperature_humidity_sensors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(45) NOT NULL,
  `role_id` int NOT NULL,
  `full_name` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `fk_role_1_idx` (`role_id`),
  CONSTRAINT `fk_role_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-31  2:28:52