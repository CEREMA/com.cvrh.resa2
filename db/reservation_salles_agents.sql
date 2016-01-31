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
-- Table structure for table `agents`
--

DROP TABLE IF EXISTS `agents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `agents` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `service` varchar(50) DEFAULT NULL,
  `servicecvrh` varchar(50) DEFAULT NULL,
  `initial` varchar(50) DEFAULT NULL,
  `mail` varchar(255) DEFAULT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `profil` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agents`
--

LOCK TABLES `agents` WRITE;
/*!40000 ALTER TABLE `agents` DISABLE KEYS */;
INSERT INTO `agents` VALUES (1,'AIMARD-GUILLOU','Véronique','DDCF','CVRH - DDCF','VAG','Veronique.Aimard-Guillou@developpement-durable.gouv.fr','04 42 16 62 45',0),(2,'ARCHER','Lorette','DIRECTION','CVRH - DIRECTION','LA','lorette.archer@developpement-durable.gouv.fr','04 42 16 62 13',0),(3,'AYEUL','Sara','DMPP','CVRH - DMPP','SA','sara.ayeul@developpement-durable.gouv.fr','04 42 16 62 14',0),(4,'BAUZET','Bruno','DDCF','CVRH - DDCF','BB','bruno.bauzet@developpement-durable.gouv.fr','04 42 16 62 25',0),(5,'BERTOLINI-LEFEVRE','Nadine','DDCF','CVRH - DDCF','NB','nadine.bertolini@developpement-durable.gouv.fr','04 42 16 62 09',0),(6,'BOIMOND','Philippe','DIRECTION','CVRH - DIRECTION','PB','philippe.boimond@developpement-durable.gouv.fr','04 42 16 62 24',0),(7,'BOULANGER','Florence','SG','CVRH - SG','FB','Florence.Boulanger@developpement-durable.gouv.fr','04 42 16 62 27',0),(8,'BRET-POCHET','Claude-Hélène','DDCF','CVRH - DDCF','CHP','claude-helene.pochet@developpement-durable.gouv.fr','04 42 16 62 11',0),(9,'BRIOLE','Yann','SG','CVRH - SG','YB','yann.briole@developpement-durable.gouv.fr','04 42 16 62 31',0),(10,'CABRIER','Brigitte','DIRECTION','CVRH - DIRECTION','BC','Brigitte.cabrier@developpement-durable.gouv.fr','04 42 16 62 21',0),(11,'CABRIER','Christian','DDCF','CVRH - DDCF','CC','christian.cabrier@developpement-durable.gouv.fr','04 42 16 62 15',0),(12,'CASTAGNEYROL','Jean Pierre','DDCF','CVRH - DDCF','JPC','Jean-pierre.castagneyrol@developpement-durable.gouv.fr','04 42 16 62 03',0),(13,'DAVID','Sandrine','DMPP','CVRH - DMPP','SD','sandrine.david@developpement-durable.gouv.fr','04 42 16 62 10',0),(14,'DE SANTA BARBARA','Michèle','SG','CVRH - SG','MDSB','m.de-santa-barbara@developpement-durable.gouv.fr','04 42 16 62 33',0),(15,'DONNADIEU','Caroline','DMPP','CVRH - DMPP','CD','caroline.donnadieu@developpement-durable.gouv.fr','04 42 16 62 38',0),(16,'GAUTHIER','Stéphanie','DDCF','CVRH - DDCF','SG','stephanie.gauthier@developpement-durable.gouv.fr','04 42 16 62 04',0),(17,'GILBERT','Christine','DDCF','CVRH - DDCF','CG','Christine.Gilbert@developpement-durable.gouv.fr','04 42 16 62 30',0),(18,'LECLERC','Martine','DMPP','CVRH - DMPP','ML','Martine.Leclerc@developpement-durable.gouv.fr','04 42 16 62 19',0),(19,'MARX','Jean-Paul','DIRECTION','CVRH - DIRECTION','JPM','jean-paul.marx@developpement-durable.gouv.fr','04 42 16 62 09',0),(20,'MASTORAS','Patrick','SG','CVRH - SG','PM','patrick.mastoras@developpement-durable.gouv.fr','04 42 16 62 22',0),(21,'MEULEAU','Jocelyne','DDCF','CVRH - DDCF','JM','Jocelyne.Meuleau@developpement-durable.gouv.fr','04 42 16 62 06',0),(22,'MONTI','Isabelle','SG','CVRH - SG','IM','isabelle.monti@developpement-durable.gouv.fr','04 42 16 62 05',0),(23,'PEPE','Sandrine','DMPP','CVRH - DMPP','SP','sandrine.pepe@developpement-durable.gouv.fr','04 42 16 62 37',0),(24,'PICCIONE','Eric','DDCF','CVRH - DDCF','EP','Eric.Piccione@developpement-durable.gouv.fr','04 42 16 62 18',0),(25,'PY','Jean-Noël','DDCF','CVRH - DDCF','JNP','jean-noel.py@developpement-durable.gouv.fr','04 42 16 62 23',0),(26,'RIGO','André','DMPP','CVRH - DMPP','AR','andre.rigo@developpement-durable.gouv.fr','04 42 16 62 26',0),(27,'ROLLY','Marie-Hélène','DDCF','CVRH - DDCF','MHR','marie-helene.rolly@developpement-durable.gouv.fr','04 42 16 62 28',0),(28,'SAINT-GRATIEN','Colette','DDCF','CVRH - DDCF','CSG','colette.saint-gratien@developpement-durable.gouv.fr','04 42 16 62 12',0),(29,'SCAMPS','Anne','DMPP','CVRH - DMPP','AS','anne.scamps@developpement-durable.gouv.fr','04 42 16 62 43',0),(30,'TROUCHE','René','DIRECTION','CVRH - DIRECTION','RT','rene.trouche@developpement-durable.gouv.fr','04 42 16 62 20',0),(31,'VACCHINO','Martine','SG','CVRH - SG','MV','martine.vacchino@developpement-durable.gouv.fr','04 42 16 62 01',0),(32,'ZUCATTI','Stéphane','SG','CVRH - SG','SZ','stephane.zucatti@cerema.fr','04 42 16 62 01',1),(33,'KAVOUNOUDIAS','Armelle','DDCF','CVRH-DDCF','AK','armelle.kavounoudias@developpement-durable.gouv.fr','0442166229',NULL);
/*!40000 ALTER TABLE `agents` ENABLE KEYS */;
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
