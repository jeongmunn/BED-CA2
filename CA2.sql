-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: sp_games
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `sp_category`
--

DROP TABLE IF EXISTS `sp_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sp_category` (
  `catid` int NOT NULL AUTO_INCREMENT,
  `catname` varchar(45) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`catid`),
  UNIQUE KEY `catname_UNIQUE` (`catname`),
  UNIQUE KEY `catid_UNIQUE` (`catid`)
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sp_category`
--

LOCK TABLES `sp_category` WRITE;
/*!40000 ALTER TABLE `sp_category` DISABLE KEYS */;
INSERT INTO `sp_category` VALUES (1,'Action','An action game emphasizes physical challenges, including hand–eye coordination and reaction-time','2021-01-03 19:54:47'),(2,'Sport','A sport game emphasizes physical challenges.','2020-12-18 15:03:49'),(3,'Mind','A mind game may help sharpen certain thinking skills that tend to wane with age, such as processing speed, planning skills, reaction time, decision making, and short-term memory','2020-12-18 20:12:38'),(4,'Other','Fun games','2020-12-18 20:12:38'),(88,'PS','test','2021-02-07 23:35:09');
/*!40000 ALTER TABLE `sp_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sp_game`
--

DROP TABLE IF EXISTS `sp_game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sp_game` (
  `gameid` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `price` double NOT NULL,
  `platform` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `categoryid` int NOT NULL,
  `year` year NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`gameid`),
  KEY `catid_idx` (`categoryid`),
  CONSTRAINT `catid` FOREIGN KEY (`categoryid`) REFERENCES `sp_category` (`catid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sp_game`
--

LOCK TABLES `sp_game` WRITE;
/*!40000 ALTER TABLE `sp_game` DISABLE KEYS */;
INSERT INTO `sp_game` VALUES (1,'Assassin’s Creed Valhalla','Assassin\'s Creed Valhalla is an action role-playing video game developed by Ubisoft Montreal and published by Ubisoft',69.9,'PC',1,2020,'2021-01-04 00:51:54','https://upload.wikimedia.org/wikipedia/en/f/f8/ACValhalla.jpg'),(2,'Just Dance 2021','Just Dance 2021 is a dance rhythm game developed by Ubisoft',58.7,'PS5',2,2020,'2020-12-19 10:34:39','https://ubistatic19-a.akamaihd.net/ubicomstatic/en-us/global/search-thumbnail/ubicom-jd2021-page-meta-artwork_mobile_363097.jpg'),(3,'Overcooked 2','Overcooked is a cooking simulation game developed by Ghost Town Games and published by Team17',69.7,'NS',4,2017,'2020-12-19 10:40:33','https://www.team17.com/wp-content/uploads/2020/08/Overcooked2-Desktop-Tile2.jpg'),(4,'Animal Crossing','Animal Crossing is a social simulation video game series developed and published by Nintendo',89.5,'NS',4,2020,'2020-12-19 10:40:33','https://upload.wikimedia.org/wikipedia/en/1/1f/Animal_Crossing_New_Horizons.jpg');
/*!40000 ALTER TABLE `sp_game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sp_review`
--

DROP TABLE IF EXISTS `sp_review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sp_review` (
  `reviewid` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL,
  `gameid` int NOT NULL,
  `content` longtext NOT NULL,
  `rating` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`reviewid`),
  KEY `gameid_idx` (`gameid`),
  KEY `userid_idx` (`userid`),
  CONSTRAINT `gameid` FOREIGN KEY (`gameid`) REFERENCES `sp_game` (`gameid`) ON DELETE CASCADE,
  CONSTRAINT `userid` FOREIGN KEY (`userid`) REFERENCES `sp_user` (`userid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sp_review`
--

LOCK TABLES `sp_review` WRITE;
/*!40000 ALTER TABLE `sp_review` DISABLE KEYS */;
INSERT INTO `sp_review` VALUES (1,2,2,'Good !',4,'2020-12-24 09:56:08'),(2,2,2,'Bad',1,'2021-02-06 11:51:27'),(3,1,4,'Bad',2,'2020-12-24 09:56:08'),(10,1,2,'SO FUN !',3,'2021-02-07 14:41:08'),(11,1,2,'FUN',3,'2021-02-07 14:42:42'),(14,1,2,'',0,'2021-02-07 15:38:37'),(15,1,2,'',0,'2021-02-07 15:38:38');
/*!40000 ALTER TABLE `sp_review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sp_user`
--

DROP TABLE IF EXISTS `sp_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sp_user` (
  `userid` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `email` varchar(115) NOT NULL,
  `password` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  `profile_pic_url` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sp_user`
--

LOCK TABLES `sp_user` WRITE;
/*!40000 ALTER TABLE `sp_user` DISABLE KEYS */;
INSERT INTO `sp_user` VALUES (1,'jeongmun.j','jeongmunn@gmail.com','jeongmun','admin','https://www.ig.com/jeongmun.j.jpg','2020-12-24 08:37:35'),(2,'a.16.h','amandahee02@gmail.com','amanda','customer','https://www.ig.com/a.16.h.jpg','2020-12-24 08:52:22'),(3,'geraldhoojk','geraldhoo@gmail.com','gerald','customer','http://www.ig.com/geraldhoo.jpg','2020-12-24 08:52:22'),(18,'Joyce','joyce8803@gmail.com','joyce','admin','https://www.ig.com/joyce.jpg','2021-01-07 03:02:38'),(27,'abc','abc@gmail.com','abc','admin','abc.com','2021-02-07 22:54:53'),(28,'jw','jw@gmail.com','jw','customer','jw.com','2021-02-07 23:05:22'),(33,'jk','jk@gmail.com','jk','admin','jk.com','2021-02-07 23:12:33');
/*!40000 ALTER TABLE `sp_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-08  8:49:17
