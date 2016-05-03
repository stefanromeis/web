-- phpMyAdmin SQL Dump
-- version 4.0.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Erstellungszeit: 15. Okt 2014 um 22:15
-- Server Version: 5.6.14
-- PHP-Version: 5.5.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `sequence_editor`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(100) unsigned NOT NULL AUTO_INCREMENT,
  `json` text COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=120 ;

--
-- Daten für Tabelle `user`
--

INSERT INTO `user` (`id`, `json`, `email`, `name`) VALUES
(108, '{"coords":[{"xy1":["52.550248","13.390802"],"xy2":["52.555182","13.383280"],"xy3":["52.555574","13.383581"],"xy4":["52.550373","13.391249"]}],"infos":[[true,false,false,false,false,true,false]]}', 'xxx@xxx.xxx', '1 - BellermannstraÃŸe'),
(109, '{"coords":[{"xy1":["52.550248","13.390802"],"xy2":["52.555182","13.383280"],"xy3":["52.551108","13.382872"],"xy4":["52.551024","13.383473"]}],"infos":[[false,false,false,true,false,false,false,false,false,false,true,false,false,true,false]]}', 'xxx@xxx.xxx', '2 - Stettiner StraÃŸe'),
(110, '{"coords":[{"xy1":["52.555182","13.383280"],"xy2":["52.551108","13.382872"],"xy3":["52.551103","13.381612"],"xy4":["52.552290","13.380797"]}],"infos":[[true,true,false,false,true,false,true,false,false,false,true,false,false,false,false]]}', 'xxx@xxx.xxx', '3 - BadstraÃŸe I'),
(111, '{"coords":[{"xy1":["52.555182","13.383280"],"xy2":["52.552290","13.380797"],"xy3":["52.552766","13.379220"],"xy4":["52.553340","13.379488"]}],"infos":[[false,false,false,true,false,false,false,false,false,false,false,false,false,true,false]]}', 'xxx@xxx.xxx', '4 - BadstraÃŸe II'),
(112, '{"coords":[{"xy1":["52.552290","13.380797"],"xy2":["52.552766","13.379220"],"xy3":["52.551357","13.376977"],"xy4":["52.551155","13.377278"]}],"infos":[[true,false,false,false,false,false,false,false,false,false,false,false,false,true,false]]}', 'xxx@xxx.xxx', '5 - ButtmanstraÃŸe'),
(113, '{"coords":[{"xy1":["52.549681","13.374939"],"xy2":["52.550411","13.374939"],"xy3":["52.551357","13.376977"],"xy4":["52.551155","13.377278"]}],"infos":[[false,false,false,false,false,false,false,true,true,true,false,false,false,false,false]]}', 'xxx@xxx.xxx', '6 - Brunnenplatz'),
(114, '{"coords":[{"xy1":["52.549681","13.374939"],"xy2":["52.550411","13.374939"],"xy3":["52.550881","13.373544"],"xy4":["52.550111","13.374038"]}],"infos":[[false,false,true,false,false,false,false,false,false,false,false,false,true,false,false]]}', 'xxx@xxx.xxx', '7 - SchÃ¶nstedtstraÃŸe'),
(115, '{"coords":[{"xy1":["52.553423","13.387043"],"xy2":["52.552494","13.388099"],"xy3":["52.552073","13.387579"],"xy4":["52.553022","13.386367"]}],"infos":[[true,false,false,false,false,false,false]]}', '111@xxx.xxx', '1 - Wohnung'),
(116, '{"coords":[{"xy1":["52.555186","13.384417"],"xy2":["52.555437","13.383438"],"xy3":["52.554872","13.383245"],"xy4":["52.554721","13.383928"]}],"infos":[[false,false,false,false,false,true,false]]}', '111@xxx.xxx', '2 - BellermannstraÃŸe - Prinzenallee'),
(119, '{"coords":[{"xy1":["52.553520","13.381476"],"xy2":["52.553102","13.383514"],"xy3":["52.550741","13.381368"],"xy4":["52.551876","13.378944"]}],"infos":[[false,true,false,true,false,true,false]]}', '111@xxx.xxx', '3 - Schule');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
