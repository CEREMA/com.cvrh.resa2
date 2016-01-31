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
-- Table structure for table `stagiaire`
--

DROP TABLE IF EXISTS `stagiaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stagiaire` (
  `id_stagiaire` int(11) NOT NULL AUTO_INCREMENT,
  `NumGEFF` varchar(255) DEFAULT NULL,
  `Nom_stagiaire` varchar(50) DEFAULT NULL,
  `Prenom_stagiaire` varchar(255) DEFAULT NULL,
  `Mail_stagiaire` varchar(255) DEFAULT NULL,
  `Presence` varchar(255) DEFAULT NULL,
  `Categorie_statutaire` varchar(255) DEFAULT NULL,
  `Sexe` varchar(255) DEFAULT NULL,
  `Accepte` varchar(255) DEFAULT NULL,
  `Motif_refus` varchar(255) DEFAULT NULL,
  `Jours_de_presence` int(11) DEFAULT NULL,
  `Situation_statutaire_stagiaire` varchar(255) DEFAULT NULL,
  `Hebergement` varchar(255) DEFAULT NULL,
  `Restauration` varchar(255) DEFAULT NULL,
  `Nom_service_stagiaire` varchar(255) DEFAULT NULL,
  `region` varchar(255) DEFAULT NULL,
  `interregion` varchar(255) DEFAULT NULL,
  `Numero_departement` int(11) DEFAULT NULL,
  `Typologie_service` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_stagiaire`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stagiaire`
--

LOCK TABLES `stagiaire` WRITE;
/*!40000 ALTER TABLE `stagiaire` DISABLE KEYS */;
/*!40000 ALTER TABLE `stagiaire` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-01-31 13:10:05
