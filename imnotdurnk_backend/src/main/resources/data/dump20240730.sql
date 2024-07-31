-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: imnotdurnk_db
-- ------------------------------------------------------
-- Server version	9.0.0

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
-- Table structure for table `calendar`
--

DROP TABLE IF EXISTS `calendar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calendar` (
  `alcohol_level` int DEFAULT NULL,
  `arrival_time` time(6) DEFAULT NULL,
  `beer_amount` int DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `soju_amount` int DEFAULT NULL,
  `user_id` int NOT NULL,
  `date` datetime(6) NOT NULL,
  `mod_date` datetime(6) DEFAULT NULL,
  `reg_date` datetime(6) DEFAULT NULL,
  `title` varchar(30) DEFAULT NULL,
  `memo` tinytext,
  PRIMARY KEY (`id`),
  KEY `FKmvq5ob3dt7uk7sfcfa0wrd7bb` (`user_id`),
  CONSTRAINT `FKmvq5ob3dt7uk7sfcfa0wrd7bb` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calendar`
--

LOCK TABLES `calendar` WRITE;
/*!40000 ALTER TABLE `calendar` DISABLE KEYS */;
INSERT INTO `calendar` VALUES (0,'18:00:00.000000',0,1,1,11,'2024-11-20 11:00:00.000000','2024-07-24 05:13:19.339350','2024-07-24 05:13:19.339350','친구와의 만남','친구와의 만남'),(1,'19:30:00.000000',1,2,1,11,'2024-11-05 12:00:00.000000','2024-07-24 05:13:23.750918','2024-07-24 05:13:23.750918','저녁 모임','저녁 모임'),(1,'20:00:00.000000',1,3,1,11,'2024-10-20 13:00:00.000000','2024-07-24 05:13:28.665156','2024-07-24 05:13:28.665156','가벼운 음주','가벼운 음주'),(10,'21:00:00.000000',9,4,3,11,'2024-10-05 14:00:00.000000','2024-07-24 05:13:33.196911','2024-07-24 05:13:33.196911','할로윈 준비','할로윈 준비'),(4,'19:30:00.000000',3,5,2,11,'2024-09-15 12:30:00.000000','2024-07-24 05:13:38.144865','2024-07-24 05:13:38.144865','캐주얼 모임','캐주얼 모임'),(8,'20:30:00.000000',7,6,2,11,'2024-09-01 13:00:00.000000','2024-07-24 05:13:42.550523','2024-07-24 05:13:42.550523','콘서트 후 파티','콘서트 후 파티'),(6,'17:30:00.000000',5,7,2,11,'2024-08-20 11:00:00.000000','2024-07-24 05:13:47.569517','2024-07-24 05:13:47.569517','회식','회사 회식'),(9,'22:00:00.000000',8,8,4,11,'2024-08-05 14:30:00.000000','2024-07-24 05:13:52.496318','2024-07-24 05:13:52.496318','바 호핑','바에서 술 마시기'),(5,'19:00:00.000000',4,9,2,11,'2024-07-15 11:30:00.000000','2024-07-24 05:13:57.103244','2024-07-24 05:13:57.103244','생일 축하','생일 파티'),(7,'21:30:00.000000',6,10,2,11,'2024-07-02 13:30:00.000000','2024-07-24 05:14:01.742526','2024-07-24 05:14:01.742526','저녁 외출','친구들과 저녁 모임'),(4,'21:30:00.000000',6,11,2,11,'2024-06-29 22:30:00.000000','2024-07-24 05:25:03.198763','2024-07-24 05:25:03.198763','저녁 외출','친구들과 저녁 모임'),(3,'19:00:00.000000',4,12,2,11,'2024-07-12 20:30:00.000000','2024-07-24 05:25:03.198763','2024-07-24 05:25:03.198763','생일 축하','생일 파티'),(4,'22:00:00.000000',8,13,4,11,'2024-08-02 23:30:00.000000','2024-07-24 05:25:03.198763','2024-07-24 05:25:03.198763','바 호핑','바에서 술 마시기'),(3,'17:30:00.000000',5,14,2,11,'2024-08-17 20:00:00.000000','2024-07-24 05:25:03.198763','2024-07-24 05:25:03.198763','회식','회사 회식'),(4,'20:30:00.000000',7,15,2,11,'2024-08-29 22:00:00.000000','2024-07-24 05:25:03.198763','2024-07-24 05:25:03.198763','콘서트 후 파티','콘서트 후 파티'),(2,'19:30:00.000000',3,16,2,11,'2024-09-12 21:30:00.000000','2024-07-24 05:25:03.198763','2024-07-24 05:25:03.198763','캐주얼 모임','캐주얼 모임'),(3,'21:00:00.000000',9,17,3,11,'2024-10-02 23:00:00.000000','2024-07-24 05:25:03.198763','2024-07-24 05:25:03.198763','할로윈 준비','할로윈 준비'),(1,'20:00:00.000000',1,18,1,11,'2024-10-17 22:00:00.000000','2024-07-24 05:25:03.198763','2024-07-24 05:25:03.198763','가벼운 음주','가벼운 음주'),(2,'19:30:00.000000',1,19,1,11,'2024-11-02 21:00:00.000000','2024-07-24 05:25:03.198763','2024-07-24 05:25:03.198763','저녁 모임','저녁 모임'),(0,'18:00:00.000000',0,20,1,11,'2024-11-17 20:00:00.000000','2024-07-24 05:25:03.198763','2024-07-24 05:25:03.198763','친구와의 만남','친구와의 만남');
/*!40000 ALTER TABLE `calendar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_log`
--

DROP TABLE IF EXISTS `game_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game_log` (
  `game_type` int DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `plan_id` int NOT NULL,
  `score` int DEFAULT NULL,
  `time_log` time(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK8s8bb9yn67ucdflkmgug4i5g0` (`plan_id`),
  CONSTRAINT `FK8s8bb9yn67ucdflkmgug4i5g0` FOREIGN KEY (`plan_id`) REFERENCES `calendar` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_log`
--

LOCK TABLES `game_log` WRITE;
/*!40000 ALTER TABLE `game_log` DISABLE KEYS */;
INSERT INTO `game_log` VALUES (1,1,1,85,'21:00:00.000000'),(2,2,1,78,'20:45:00.000000'),(3,3,2,92,'18:30:00.000000'),(4,4,2,75,'18:15:00.000000'),(1,5,3,88,'21:50:00.000000'),(2,6,3,80,'21:40:00.000000'),(1,7,4,90,'17:00:00.000000'),(2,8,4,67,'16:50:00.000000'),(3,9,5,85,'19:00:00.000000'),(4,10,5,60,'18:30:00.000000'),(1,11,6,73,'20:00:00.000000'),(3,12,6,82,'19:40:00.000000'),(4,13,7,95,'20:30:00.000000'),(2,14,7,70,'20:15:00.000000'),(1,15,8,78,'22:00:00.000000'),(2,16,8,65,'21:50:00.000000'),(3,17,9,90,'21:30:00.000000'),(1,18,9,88,'21:20:00.000000'),(2,19,10,80,'20:00:00.000000'),(3,20,10,72,'19:50:00.000000'),(1,21,11,85,'21:00:00.000000'),(2,22,11,78,'20:45:00.000000'),(3,23,12,92,'18:30:00.000000'),(4,24,12,75,'18:15:00.000000'),(1,25,13,88,'21:50:00.000000'),(2,26,13,80,'21:40:00.000000'),(1,27,14,90,'17:00:00.000000'),(2,28,14,67,'16:50:00.000000'),(3,29,15,85,'19:00:00.000000'),(4,30,15,60,'18:30:00.000000'),(1,31,16,73,'20:00:00.000000'),(3,32,16,82,'19:40:00.000000'),(4,33,17,95,'20:30:00.000000'),(2,34,17,70,'20:15:00.000000'),(1,35,18,78,'22:00:00.000000'),(2,36,18,65,'21:50:00.000000'),(3,37,19,90,'21:30:00.000000'),(1,38,19,88,'21:20:00.000000'),(2,39,20,80,'20:00:00.000000'),(3,40,20,72,'19:50:00.000000');
/*!40000 ALTER TABLE `game_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `beer_capacity` int DEFAULT NULL,
  `deleted` bit(1) NOT NULL DEFAULT b'0',
  `id` int NOT NULL AUTO_INCREMENT,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `soju_capacity` int DEFAULT NULL,
  `unsure` bit(1) DEFAULT NULL,
  `verified` bit(1) DEFAULT b'0',
  `mod_date` datetime(6) DEFAULT NULL,
  `reg_date` datetime(6) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `detailed_address` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `emergency_call` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `postal_code` varchar(255) DEFAULT NULL,
  `voice` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (NULL,_binary '\0',1,37.5035,127.0297,NULL,_binary '',_binary '','2024-07-24 04:58:50.930850','2024-07-24 04:58:50.930850','서울특별시 강남구 삼성동 159-9','삼성래미안 101동 203호','johndoe1@example.com','010-1111-2222','홍길동','길동이','$2a$10$8XzSA.k4i7LMQpcrqBjJiOE9iBRo3MCTRnnBYkNWaWdxCILLPZSKe','010-1234-5678','06161',NULL),(4,_binary '\0',2,35.1673,129.1316,3,_binary '\0',_binary '','2024-07-24 04:59:08.454143','2024-07-24 04:59:08.454143','부산광역시 해운대구 우동 548','해운대아이파크 301동 1501호','janedoe2@example.com','010-2222-3333','이순신','순신이','$2a$10$0jZI7mz0t7OYVRX8MGTZQOl4dVH9H4w70GedyzN9e64DTkjwsLG3O','010-2345-6789','48058',NULL),(2,_binary '\0',3,35.8712,128.6015,5,_binary '\0',_binary '','2024-07-24 04:59:22.536846','2024-07-24 04:59:22.536846','대구광역시 중구 동성로2가 74','동성로 대림아파트 105동 802호','user1234@example.com','010-3333-4444','박세리','세리야','$2a$10$X7zbASvHyfTkNryJ0Z6.VOBrpREw.xgJ/XtdXb.Vex.T/ukBO4umO','010-3456-7890','41911',NULL),(NULL,_binary '\0',4,37.3822,126.6517,NULL,_binary '',_binary '','2024-07-24 04:59:28.989426','2024-07-24 04:59:28.989426','인천광역시 연수구 송도동 10-1','송도자이 501동 303호','contact5678@example.com','010-4444-5555','김철수','철수야','$2a$10$eCHrwjL0ZiUJXLm8HoX04eNeFi0fG3Pb9H2nMC/yRFJp/SqhpaNw6','010-4567-8901','21999',NULL),(1,_binary '\0',5,35.16,126.8505,4,_binary '\0',_binary '','2024-07-24 04:59:36.127436','2024-07-24 04:59:36.127436','광주광역시 서구 화정동 721-7','화정삼성래미안 302동 1801호','info9876@example.com','010-5555-6666','최영희','영희야','$2a$10$8B6kxgBiUkTjTtKdnSDkJeZeFlKv1mOK5X6S8MPFzl5xtVsSrDlnS','010-5678-9012','61928',NULL),(5,_binary '\0',6,36.3502,127.384,2,_binary '\0',_binary '','2024-07-24 04:59:43.578884','2024-07-24 04:59:43.578884','대전광역시 서구 둔산동 1376','둔산엘지인빌 303동 1203호','admin5432@example.com','010-6666-7777','한석봉','석봉이','$2a$10$ZXHenqee5d6QR51ZC90VaOMGM3djN5E09YzNTJgw22tETg1e3JaHe','010-6789-0123','35242',NULL),(NULL,_binary '\0',7,35.5364,129.3112,NULL,_binary '',_binary '','2024-07-24 04:59:49.909284','2024-07-24 04:59:49.909284','울산광역시 남구 삼산동 1502-2','삼산롯데캐슬 201동 1503호','support8765@example.com','010-7777-8888','장보고','보고야','$2a$10$o5WqKJCid2mQqBxk6ASaNODu0kFuunK.00QROl.vzoMeO1nF.fEUK','010-7890-1234','44718',NULL),(3,_binary '\0',8,37.2625,127.0311,1,_binary '\0',_binary '','2024-07-24 04:59:55.196312','2024-07-24 04:59:55.196312','경기도 수원시 영통구 이의동 129-1','영통역프라자 101동 1403호','hello4321@example.com','010-8888-9999','신사임당','사임이','$2a$10$OdUR/G4tCbUjl3KzxjRxjOpgkqk95JxEFXTV.xavKYoDjNgH3v5AO','010-8901-2345','16677',NULL),(0,_binary '\0',9,35.2282,128.6787,0,_binary '\0',_binary '','2024-07-24 05:00:02.971177','2024-07-24 05:00:02.971177','경상남도 창원시 성산구 상남동 25','상남현대아파트 201동 1601호','userinfo3456@example.com','010-9999-0000','정약용','약용이','$2a$10$sAlFeLx5xMi1wTVrOtNVMerU9zuQhXFf4WYkfpNLtSCTZf3O1nsxC','010-9012-3456','51524',NULL),(NULL,_binary '\0',10,36.6418,127.4878,NULL,_binary '',_binary '','2024-07-24 05:00:09.481486','2024-07-24 05:00:09.481486','충청북도 청주시 상당구 용암동 174','용암신일해피트리 102동 1301호','contact6543@example.com','010-0000-1111','유관순','관순이','$2a$10$YZxmST/CP6lyeuhIi0WOU.e/tZptM0Zqcisdh9Ap4cLsbcvNrMh8G','010-0123-4567','28515',NULL),(4,_binary '\0',11,37.503325874722,127.04403462366,1,_binary '\0',_binary '','2024-07-24 05:06:53.028533','2024-07-24 05:06:53.028533','서울 강남구 테헤란로 212','1402호','ssafy@ssafy.com','010-0000-1111','김싸피','싸피','$2a$10$DEIV7aT57xmx7ctpWTib4OEDdtNHO/6Znt3CgLFqJmYSp80DgiTpO','010-0123-4567','06220',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voice`
--

DROP TABLE IF EXISTS `voice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `voice` (
  `id` int NOT NULL AUTO_INCREMENT,
  `log_id` int NOT NULL,
  `file_name` varchar(20) NOT NULL,
  `file_url` tinytext NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK8yg5ue84rwdp04hvngah4l567` (`log_id`),
  CONSTRAINT `FK8yg5ue84rwdp04hvngah4l567` FOREIGN KEY (`log_id`) REFERENCES `game_log` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voice`
--

LOCK TABLES `voice` WRITE;
/*!40000 ALTER TABLE `voice` DISABLE KEYS */;
/*!40000 ALTER TABLE `voice` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-30 16:51:17
