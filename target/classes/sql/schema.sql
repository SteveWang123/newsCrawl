CREATE TABLE `news` (
   `siteUrl` varchar(100) NOT NULL,
   `link` varchar(250) NOT NULL,
   `title` varchar(250) NOT NULL,
   `pubDate` varchar(100) DEFAULT NULL,
   `content` varchar(60000) DEFAULT NULL,
   `ID` bigint(10) NOT NULL AUTO_INCREMENT,
   `crawlDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY (`id`),
   UNIQUE KEY `NewIndex1` (`title`)
 ) ENGINE=InnoDB AUTO_INCREMENT=2042 DEFAULT CHARSET=utf8


CREATE TABLE `sitenote` (
   `siteUrl` varchar(100) NOT NULL,
   `siteZname` varchar(200) NOT NULL,
   `disOrder` int(11) NOT NULL,
   PRIMARY KEY (`siteUrl`),
   UNIQUE KEY `NewIndex1` (`disOrder`)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8


