-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 24, 2014 at 03:36 AM
-- Server version: 5.6.12-log
-- PHP Version: 5.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `ideaoverflow2_ma`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE IF NOT EXISTS `comments` (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) NOT NULL,
  `comment_text` text NOT NULL,
  `time` bigint(20) NOT NULL,
  `uid` varchar(256) NOT NULL,
  `deleted_time` bigint(20) DEFAULT NULL COMMENT 'time deleted, if deleted',
  PRIMARY KEY (`cid`),
  KEY `p_id` (`pid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=27 ;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`cid`, `pid`, `comment_text`, `time`, `uid`, `deleted_time`) VALUES
(14, 565, 'aoeu', 1390531768, '', NULL),
(15, 565, 'aoeu', 1390531773, '', NULL),
(16, 565, 'aoe', 1390532010, '', NULL),
(17, 565, 'aoeu aoeu aaoeu aoeu aaoeu aoeu aaoeu aoeu aaoeu aoeu aaoeu aoeu aaoeu aoeu aaoeu aoeu aaoeu aoeu aaoeu aoeu aaoeu aoeu aaoeu aoeu aaoeu aoeu aaoeu aoeu aaoeu aoeu aaoeu aoeu aaoeu aoeu aaoeu aoeu aaoeu aoeu aaoeu aoeu a\n', 1390532215, '', NULL),
(18, 565, '.,''p.p\n', 1390532623, '', NULL),
(19, 565, 'cgrcf\n', 1390532777, '', NULL),
(20, 565, 'thtnh\n', 1390532828, '', NULL),
(21, 565, 'tnh s\n', 1390533026, '', NULL),
(22, 558, 'th th\n', 1390533030, '', NULL),
(23, 560, 'tht\n ~jcoth', 1390533509, '', NULL),
(24, 560, 'aoenhtu \n ~jcoth', 1390534339, '', NULL),
(25, 560, 'noateuh \n ~jcoth', 1390534342, '', NULL),
(26, 560, 'nte huaosen\n ~jcoth', 1390534347, '', NULL);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
