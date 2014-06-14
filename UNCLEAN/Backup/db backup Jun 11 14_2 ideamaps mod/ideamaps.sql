-- phpMyAdmin SQL Dump
-- version 4.0.5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jun 11, 2014 at 04:48 PM
-- Server version: 5.0.96-community
-- PHP Version: 5.3.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `jcole_ideaoverflow2_ma`
--

-- --------------------------------------------------------

--
-- Table structure for table `ideamaps`
--

CREATE TABLE IF NOT EXISTS `ideamaps` (
  `mapid` int(11) NOT NULL auto_increment,
  `mapname` varchar(500) NOT NULL,
  `maplogourl` varchar(2046) NOT NULL,
  `mapdesc` text NOT NULL,
  `email` varchar(256) NOT NULL,
  `password` varchar(60) NOT NULL,
  `sortrank` double NOT NULL,
  PRIMARY KEY  (`mapid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=257 ;

--
-- Dumping data for table `ideamaps`
--

INSERT INTO `ideamaps` (`mapid`, `mapname`, `maplogourl`, `mapdesc`, `email`, `password`, `sortrank`) VALUES
(0, 'MA State Government', '', '', '', '', 0),
(3, 'MIT', '', '', '', '', 0),
(9, 'Princeton ', '', '', '', '', 0),
(4, 'MIT ADPhi', '', '', '', '', 0),
(1, 'MA State Budget', '', '', '', '', 0),
(5, 'MIT Elections Committee', '', '', '', '', 0),
(6, 'MIT 2030', '', '', '', '', 0),
(7, 'MIT 2030 Student Center Renovation Ideas', '', '', '', '', 0),
(10, 'Harvard', '', '', '', '', 0),
(11, 'Harvard Eliot House', '', '', '', '', 0),
(12, '#person jcole', '', '', '', '', 0),
(13, 'Quote Board', '', '', '', '', 0),
(14, '(outdated, see below) Hackathon Project Ideas', '', '', '', '', 0),
(15, 'Foods Chase Likes', '', '', '', '', 0),
(16, 'MIT Complaints - Why thought of transferring out', '', '', '', '', 0),
(17, 'MIT Opportunities - Why thought of transferring in', '', '', '', '', 0),
(18, 'MIT People\\''s Stories', '', '', '', '', 0),
(19, 'If I went to MIT (or other top college) I would...', '', '', '', '', 0),
(20, 'Greater Boston Area', '', '', '', '', 0),
(21, 'MIT SIPB', '', '', '', '', 0),
(22, 'Coolest things in the world', '', '', '', '', 0),
(23, 'Rice', '', '', '', '', 0),
(24, 'AngelHack Boston 2013', '', '', '', '', 0),
(25, 'Aptonym', '', '', '', '', 0),
(26, 'Books for Jacob', '', '', '', '', 0),
(27, 'Del Mar Terrace', '', '', '', '', 0),
(28, 'TZ MIT Hackathon', '', '', '', '', 0),
(29, 'Stanford HUMBIO 183: Astrobiology &amp; Space Exploration', '', '', '', '', 0),
(30, 'Compass', '', '', '', '', 0),
(31, 'Leap Motion Project Ideas', '', '', '', '', 0),
(32, 'Web Dev Resources', '', '', '', '', 0),
(33, 'Greylock Hackfest Ideas', '', '', '', '', 0),
(34, 'Foods', '', '', '', '', 0),
(35, 'jmjmkj klm', '', '', '', '', 0),
(36, ' k k kkmlkmlkmlmkmlkmlmlmlkmmlmlmlkmlmlkm', '', '', '', '', 0),
(37, 'wutttttt', '', '', '', '', 0),
(38, 'Palo Alto', '', '', '', '', 0),
(39, 'Words that are Good', '', '', '', '', 0),
(40, 'Jacob', '', '', '', '', 0),
(41, 'Stanford Class Recs', '', '', '', '', 0),
(42, 'testing 1 2 3\n', '', '', '', '', 0),
(43, 'Suggestions for Asana', '', '', '', '', 0),
(44, 'Meditation-inducing thoughts', '', '', '', '', 0),
(45, 'dropbox hack week\n', '', '', '', '', 0),
(46, 'Phoenix Dinner Event 8/3/13', '', '', '', '', 0),
(47, 'Idea of the Day', '', '', '', '', 0),
(48, 'Internet of Things\n', '', '', '', '', 0),
(49, 'Knowledge Structuring Problems', '', '', '', '', 0),
(50, 'Tanzania', '', '', '', '', 0),
(51, 'ADHD', '', '', '', '', 0),
(52, 'Quadrotor.tk', '', '', '', '', 0),
(53, 'Quadrotor Ideas', '', '', '', '', 0),
(54, 'Quadrotor Drone Ideas', '', '', '', '', 0),
(55, 'DIY Entertainment', '', '', '', '', 0),
(56, 'MIT Classes', '', '', '', '', 0),
(57, 'Harvard Classes', '', '', '', '', 0),
(58, 'Test', '', '', '', '', 0),
(59, 'Test', '', '', '', '', 0),
(60, 'things you didnt know existed at berkeley', '', '', '', '', 0),
(61, 'QC Books', '', '', '', '', 0),
(62, 'Hackers@Berkeley', '', '', '', '', 0),
(63, 'CS Jobs List', '', '', '', '', 0),
(64, 'PennApps 2013 Suggestions', '', '', '', '', 0),
(65, 'Idea Mapping People', '', '', '', '', 0),
(66, 'CSM', '', '', '', '', 0),
(67, 'Github', '', '', '', '', 0),
(68, 'Tai Chi', '', '', '', '', 0),
(69, 'Possible Intercontinental Hackathon Sponsors', '', '', '', '', 0),
(70, 'africa entrepreneurship\n', '', '', '', '', 0),
(71, 'Things you didn\\''t know existed at Stanford', '', '', '', '', 0),
(72, 'Urban Farming', '', '', '', '', 0),
(73, 'Things Jacob got Better at This Summer (2013)', '', '', '', '', 0),
(74, 'kodofkas', '', '', '', '', 0),
(75, 'Hacker Dojo', '', '', '', '', 0),
(76, 'Collaborative knowledge space tools', '', '', '', '', 0),
(77, 'Cornell POPSHOP cs ops', '', '', '', '', 0),
(78, 'ConceptNet Projects', '', '', '', '', 0),
(79, 'Talks by paul graham', '', '', '', '', 0),
(80, 'St Catz (St. Catherine''s College) Oxford Suggestions', '', '', '', 'Dogz', 2),
(81, 'Teas', '', '', '', '', 0),
(82, 'Computer Tricks', '', '', '', '', 0),
(83, 'Interfaces to explore graphs', '', '', '', '', 0),
(84, 'Social Enterprise Projects at Oxford', '', '', '', '', 3),
(85, 'Suggestions for Stanford in Oxford', '', '', '', '', 3),
(86, 'Stanford\n', '', '', '', '', 0),
(87, 'Projects related to ideaflow', '', '', '', '', 0),
(88, 'Harvard Public Safety Hackathon Ideas', '', '', '', '', 0),
(89, 'Harvard Public Safety Hackathon Ideas\n', '', '', '', '', 0),
(90, 'ritik\n', '', '', '', '', 0),
(91, 'toys\n', '', '', '', '', 0),
(92, 'Old Technology Ideas that Should Exist by Now\n', '', '', '', '', 0),
(93, 'Instadefine.com\n', '', '', '', '', 0),
(94, 'Dragon NaturallySpeaking', '', '', '', '', 0),
(95, 'This tool\n', '', '', '', '', 0),
(96, 'Cookies\n', '', '', '', '', 0),
(120, 'W3C\n', '', '', '', '', 0),
(119, 'VW Suggestions\n', '', '', '', '', 0),
(123, 'Possible users of this system\n', '', '', '', '', 0),
(117, 'ideas.pikans.org', '', '', '', '', 0),
(115, 'heroku', '', '', '', '', 0),
(114, 'Google', '', '', '', '', 0),
(113, 'Apple\n', '', '', '', '', 0),
(112, 'Carr\\''s', '', '', '', '', 0),
(111, 'MIT VW Hackathon\n', '', '', '', '', 0),
(110, 'Cambridge, MA', '', '', '', '', 0),
(121, 'MIT Student Government and Adminstration\n', '', '', '', '', 0),
(122, 'MIT Scripts\n', '', '', '', '', 0),
(124, 'RSI\n', '', '', '', '', 0),
(125, '~jcole\n', '', '', '', '', 0),
(126, 'Features for stickyricelove.com\n', '', '', '', '', 0),
(127, 'Chocolate\n', '', '', '', '', 0),
(128, 'Wire and String Open Gestalts\n', '', '', '', '', 0),
(130, 'TEDx Oxford GestaltBox', '', '', '', '', 3),
(131, '~David\n', '', '', '', '', 0),
(132, 'Fry Jacob', '', '', '', '', 0),
(133, 'Oxford Town\n', '', '', '', '', 3),
(134, 'Strikingly.com\n', '', '', '', '', 0),
(135, 'sitcky rice love\n', '', '', '', '', 0),
(136, 'Voice recognition\n', '', '', '', '', 0),
(137, 'Programming By Voice Resources\n', '', '', '', '', 0),
(138, 'StickyRiceLove.com\n', 'http://instadefine.com/IdeaOverflow/Outlinr-PHP/public_html/stickyricelove2/public_html/images/srl_logo.jpg', 'An anonymous suggestion box and discussion board for sexual health education in Hong Kong / ????????????????????????', 'david.furlong@stcatz.ox.ac.uk', 'connectHKyouth', 0),
(139, 'Cheese', '', '', '', '', 0),
(140, 'Projects Gilly Wants Collaborators On\n', '', '', '', '', 0),
(141, 'Projects People Want Collaborators On\n', '', '', '', '', 0),
(142, '~gilly\n', '', '', '', '', 0),
(143, 'mit\n', '', '', '', '', 0),
(144, 'mit', '', '', '', '', 0),
(145, 'HackKings Ideas - Oxford Contingent', '', '', '', '', 3),
(146, 'University College Oxford Suggestions', '', '', '', '', 2),
(147, 'New College Oxford Suggestions (Unofficial)', '', '', '', '', 2),
(148, 'Magdalen College Oxford Suggestions (Unofficial)', '', '', '', '', 2),
(149, 'Idea ', '', '', '', '', 0),
(150, 'Changing the world', '', '', '', '', 0),
(151, 'Oxford News Issues', '', '', '', '', 3),
(152, 'Web Autosuggestion Libraries\n', '', '', '', '', 0),
(153, 'CERN\n', '', '', '', '', 0),
(154, 'STFC (Science &amp; Technology Facilities Council), UK\n', '', '', '', '', 0),
(155, 'testing\n', '', '', '', '', 0),
(156, '\n', '', '', '', '', 0),
(157, '\n\n', '', '', '', '', 0),
(158, 'Facebook hackathon\n', '', '', '', '', 0),
(159, 'CEO Group Suggestions\n', '', '', '', '', 0),
(160, 'CEO Group Suggestions\n', '', '', '', '', 0),
(161, '\n', '', '', '', '', 0),
(162, 'CEO Peer Group\n', '', '', '', '', 0),
(163, 'zat\n', '', '', '', '', 0),
(164, 'cats\n', '', '', '', '', 0),
(165, 'Imperial College Suggestion\n', '', '', '', '', 0),
(166, 'Imperial College Suggestions\n', '', '', '', '', 0),
(167, 'Editable Tables HTML\n', '', '', '', '', 0),
(168, 'catz\n', '', '', '', '', 0),
(169, 'Hackathon Project Ideas (6.933)', '', 'Find others with similar ideas and synergistic skills', '', '', 0),
(170, 'Web\n', '', '', '', '', 0),
(171, 'Oscar\n', '', '', '', '', 0),
(172, 'Jokes\n', '', '', '', '', 0),
(173, 'STFC Brainstorm\n', '', '', '', '', 0),
(174, 'Magna Carta for the Web\n', '', '', 'timbl+gestaltbox@w3.org', '', 0),
(175, 'health \n', '', '', '', '', 0),
(176, 'mit \n', '', '', '', '', 0),
(177, '\n', '', '', '', '', 0),
(178, 'health\n', '', '', '', '', 0),
(179, 'MIT', '', '', '', '', 0),
(180, 'Graph Starvest', '', '', '', '', 0),
(181, 'Graph Starvest', '', '', '', '', 0),
(182, 'Media Annotation Platforms', '', '', '', '', 0),
(183, 'Startups', '', '', '', '', 0),
(184, 'Oriel College Oxford Suggestions (Unofficial)', '', '', '', '', 2),
(185, 'Oxford Brookes University Suggestions\n', '', '', '', '', 3),
(186, 'OUSU (Oxford University Student Union) Suggestions', '', '', '', '', 1),
(187, 'Oxford University Society of Biomedical Sciences (OUSBMS)\n', '', '', '', '', 3),
(188, 'St Peter''s College, Oxford Suggestions (Unofficial)', '', '', '', '', 2),
(189, 'St Hugh''s College, Oxford Suggestions (Unofficial)', '', '', '', '', 2),
(190, 'St John''s College, Oxford Suggestions (Unofficial)', '', '', '', '', 2),
(191, 'Teddy Hall (St Edmund Hall) Oxford Suggestions', '', '', '', 'SEHListens', 2),
(192, 'U.S. Congress\n', '', '', '', '', 0),
(193, 'Oler\n', '', '', '', '', 0),
(194, 'steven\n', '', '', '', '', 0),
(195, 'Asha', '', '', '', '', 0),
(196, 'API Companies', '', '', '', '', 0),
(197, 'St Hilda''s Oxford Suggestions (Unofficial)', '', '', '', '', 2),
(198, 'Essa\\''s homepage ', '', '', '', '', 0),
(199, 'Essa\\''s homepage ', '', '', '', '', 0),
(200, 'Telehackathon2.0', '', '', '', '', 0),
(201, 'Telehackathon2.0\n', '', '', '', '', 0),
(202, 'Telehackathon2.0 Feedback\n', '', '', '', '', 0),
(203, 'Late Night at Lakeside Dessert Suggestions\n', '', '', '', '', 0),
(205, 'Trinity College\n', '', '', '', '', 0),
(206, 'Trinity College Cambridge\n', '', '', '', '', 0),
(207, 'Theorems', '', '', '', '', 0),
(208, 'ProjectWiki', '', '', '', '', 0),
(209, 'Worcester College Oxford Suggestions (Unofficial)', '', '', '', '', 2),
(210, 'Worcester College Oxford Suggestions (Unofficial)', '', '', '', '', 2),
(211, 'Hello', '', '', '', '', 0),
(212, 'StartUp Grind\n', '', '', '', '', 0),
(213, 'Pearson innovation \n', '', '', '', '', 0),
(214, 'Pearson\n', '', '', '', '', 0),
(215, 'University of Oxford Suggestions', '', '', '', '', 0.5),
(216, 'homepagegen.tk\n', '', '', '', '', 0),
(217, 'Things for the Oxford Launchpad', '', '', '', '', 3),
(218, 'Things for the Oxford Launchpad', '', '', '', '', 3),
(219, 'Things for the Oxford Launchpad', '', '', '', '', 3),
(220, 'Things for the Oxford Launchpad', '', '', '', '', 3),
(221, 'Oxford Comp Soc\n', '', '', '', '', 3),
(222, 'St Cross College Oxford Suggestions (Unofficial)', '', '', '', '', 2),
(223, 'Hacker Ecology', '', '', '', '', 0),
(224, 'CERN Webfest 2014', '', '', '', '', 0),
(225, 'Balliol JCR Suggestion Box\n', '', '', '', '', 0),
(226, 'Projects at Berkeley', '', '', '', '', 0),
(227, 'Developer Program', '', '', '', '', 0),
(228, 'HackerEcology', '', '', '', '', 0),
(229, 'HackerEcology Project Map', '', '', '', '', 0),
(230, 'UK Parliament', '', '', '', '', 0),
(231, 'Balliol College Oxford Suggestions (Unofficial)\n\n', '', '', '', '', 2),
(232, 'Brasenose College Oxford Suggestions (Unofficial)\n\n', '', '', '', '', 2),
(233, 'Christ Church Oxford Suggestions (Unofficial)\n\n', '', '', '', '', 2),
(234, 'Corpus-Christi College Oxford Suggestions (Unofficial)\n\n', '', '', '', '', 2),
(235, 'Exeter College Oxford Suggestions (Unofficial)\n\n', '', '', '', '', 2),
(236, 'Green-Templeton College Oxford Suggestions (Unofficial)\n\n', '', '', '', '', 2),
(237, 'Harris-Manchester College Oxford Suggestions (Unofficial)\n\n', '', '', '', '', 2),
(238, 'Hertford College Oxford Suggestions (Unofficial)\n\n', '', '', '', '', 2),
(239, 'Jesus College Oxford Suggestions (Unofficial)\n\n', '', '', '', '', 2),
(240, 'Keble College Oxford Suggestions (Unofficial)\n\n', '', '', '', '', 2),
(241, 'Kellogg College Oxford Suggestions (Unofficial)\n\n', '', '', '', '', 2),
(242, 'Lady Margaret Hall Oxford Suggestions (Unofficial)\n\n', '', '', '', '', 2),
(243, 'Linacre College Oxford Suggestions (Unofficial)\n\n', '', '', '', '', 2),
(244, 'Lincoln College Oxford Suggestions (Unofficial)\n\n', '', '', '', '', 2),
(245, 'Mansfield College Oxford Suggestions (Unofficial)\n\n', '', '', '', '', 2),
(246, 'Merton College Oxford Suggestions (Unofficial)\n\n', '', '', '', '', 2),
(247, 'Nuffield College Oxford Suggestions (Unofficial)\n\n', '', '', '', '', 2),
(248, 'Pembroke College Oxford Suggestions (Unofficial)\n\n', '', '', '', '', 2),
(249, 'Queen''s College Oxford Suggestions (Unofficial)', '', '', '', '', 2),
(250, 'Somerville College Oxford Suggestions (Unofficial)\n\n', '', '', '', '', 2),
(251, 'St Anne''s College Oxford Suggestions (Unofficial)', '', '', '', '', 2),
(252, 'St Antony''s College Oxford Suggestions (Unofficial)', '', '', '', '', 2),
(253, 'Trinity College Oxford Suggestions (Unofficial)\n\n', '', '', '', '', 2),
(254, 'Wadham College Oxford Suggestions (Unofficial)\n\n', '', '', '', '', 2),
(255, 'Wolfson College Oxford Suggestions (Unofficial)\n\n', '', '', '', '', 2),
(256, 'test\n', '', '', '', '', 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
         