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
-- Table structure for table `ressourcesalles`
--

DROP TABLE IF EXISTS `ressourcesalles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ressourcesalles` (
  `id_ressource` int(11) NOT NULL AUTO_INCREMENT,
  `id_salle` int(11) NOT NULL,
  `id_site` int(11) NOT NULL,
  `nom_salle` varchar(255) DEFAULT NULL,
  `id_choix` varchar(50) DEFAULT NULL,
  `id_module` int(11) DEFAULT NULL,
  `debutRessource` datetime DEFAULT NULL,
  `periode` char(1) DEFAULT NULL,
  `finRessource` datetime DEFAULT NULL,
  `periodef` char(1) DEFAULT NULL,
  `preparation` tinyint(4) DEFAULT NULL,
  `salleValide` tinyint(4) DEFAULT NULL,
  `status` char(1) DEFAULT NULL,
  `commentaire` text,
  `clsRessource` varchar(50) DEFAULT 'orange',
  `afficher` tinyint(4) DEFAULT NULL,
  `mail` char(255) DEFAULT NULL,
  PRIMARY KEY (`id_ressource`),
  KEY `FK_ressourcesalles_module` (`id_module`),
  KEY `FK_ressourcesalles_salle` (`id_salle`),
  KEY `FK_ressourcesalles_site` (`id_site`),
  CONSTRAINT `FK_ressourcesalles_module` FOREIGN KEY (`id_module`) REFERENCES `module` (`id_module`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ressourcesalles_salle` FOREIGN KEY (`id_salle`) REFERENCES `salle` (`id_salle`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ressourcesalles_site` FOREIGN KEY (`id_site`) REFERENCES `site` (`id_site`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ressourcesalles`
--

LOCK TABLES `ressourcesalles` WRITE;
/*!40000 ALTER TABLE `ressourcesalles` DISABLE KEYS */;
INSERT INTO `ressourcesalles` VALUES (48,2,1,'Camargue',NULL,1550,'2016-01-31 09:00:00','J','2016-01-31 09:00:00','J',0,0,'I',NULL,'yellow',0,NULL),(52,1,1,'Mercantour',NULL,1562,'2016-01-04 12:00:00','J','2016-01-06 22:00:00','J',0,0,'I',NULL,'yellow',0,NULL);
/*!40000 ALTER TABLE `ressourcesalles` ENABLE KEYS */;
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
