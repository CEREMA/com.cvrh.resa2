-- MySQL dump 10.13  Distrib 5.6.24, for osx10.8 (x86_64)
--
-- Host: 127.0.0.1    Database: reservation_salles
-- ------------------------------------------------------
-- Server version	5.6.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `salle`
--

DROP TABLE IF EXISTS `salle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `salle` (
  `id_salle` int(11) NOT NULL AUTO_INCREMENT,
  `id_choix` int(11) NOT NULL,
  `nomSalle` varchar(50) NOT NULL,
  `lieu` varchar(50) NOT NULL,
  `id_site` int(11) NOT NULL,
  `nombrePlace` int(11) NOT NULL,
  `nombrePostesInfo` int(11) NOT NULL,
  `visio` tinyint(4) NOT NULL,
  `salleInfo` tinyint(4) NOT NULL,
  `son` tinyint(4) NOT NULL,
  `actif` int(11) NOT NULL,
  PRIMARY KEY (`id_salle`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salle`
--

LOCK TABLES `salle` WRITE;
/*!40000 ALTER TABLE `salle` DISABLE KEYS */;
INSERT INTO `salle` VALUES (1,0,'Mercantour','Rdc',1,12,9,0,1,1,0),(2,0,'Camargue','1er Etage',1,22,1,0,0,0,0),(3,0,'Cévennes','1er Etage',1,18,1,0,0,1,0),(4,0,'Méditerranée','1er Etage',1,0,0,0,0,0,0),(5,0,'Club','Rdc',1,10,1,1,0,0,0),(6,0,'Ste Victoire','Rdc',1,70,1,1,0,1,0),(7,0,'Verdon','Entresol',1,16,10,0,1,1,0),(8,0,'Cézanne','1er Etage',1,20,1,0,0,1,0),(9,0,'Lubéron','1er Etage',1,20,10,0,1,0,0),(10,0,'Salle Conférence','Rdc',2,100,1,0,0,1,0),(11,0,'Salle de Réunion','Rdc',2,25,1,0,0,1,0),(12,0,'SH1','Rdc',2,15,1,0,0,0,0),(13,0,'SH2','Rdc',2,15,1,0,0,0,0),(14,0,'SH4','Rdc',2,18,1,1,0,1,0),(15,0,'B1','Escalier Bleue - 1er Etage',2,22,11,0,1,0,0),(16,0,'B2','Escalier Bleue - 1er Etage',2,22,1,0,0,0,0),(17,0,'B3','Escalier Bleue - 1er Etage',2,22,12,0,1,0,0),(18,0,'B4','Escalier Bleue - 1er Etage',2,22,1,0,0,0,0),(19,0,'B5','Escalier Bleue - 1er Etage',2,30,1,0,0,0,0),(20,0,'B6','Escalier Bleue - 1er Etage',2,15,1,0,0,0,0),(21,0,'R1','Escalier Rouge - 1er Etage',2,25,1,0,0,0,0),(22,0,'R2','Escalier Rouge - 1er Etage',2,20,1,0,0,0,0),(23,0,'R3','Escalier Rouge - 1er Etage',2,22,1,0,0,0,0),(24,0,'R4','Escalier Rouge - 1er Etage',2,22,1,0,0,0,0),(25,0,'R5','Escalier Rouge - 1er Etage',2,22,11,0,1,1,0),(26,0,'R6','Escalier Rouge - 1er Etage',2,22,14,0,1,1,0),(27,0,'R7','Escalier Rouge - 1er Etage',2,22,1,0,0,0,0),(28,0,'R8','Escalier Rouge - 1er Etage',2,22,13,0,1,0,0),(29,0,'J1','Escalier Jaune - Sous-Sol',2,0,0,0,0,0,0),(30,0,'J2','Escalier Jaune - Sous-Sol',2,0,0,0,0,0,0),(31,0,'INFO 1','Rdc',2,22,11,0,1,1,0),(32,0,'INFO 2','Rdc',2,22,10,0,1,1,0),(33,0,'Amphi 13 Vents','Rdc',3,135,1,0,0,1,0),(34,0,'Petite Conciergerie','Rdc',3,12,1,0,0,0,0),(35,0,'Grance Conciergerie','Rdc',3,25,1,0,0,0,0),(36,0,'Salle Cézanne','Rdc',4,7,0,1,0,1,0);
/*!40000 ALTER TABLE `salle` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-01-31 13:10:04
