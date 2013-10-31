-- phpMyAdmin SQL Dump
-- version 3.5.5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 03, 2013 at 07:55 PM
-- Server version: 5.0.96-community
-- PHP Version: 5.3.17

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `jcole_ideaoverflow`
--

-- --------------------------------------------------------

--
-- Table structure for table `ideasdb`
--

CREATE TABLE IF NOT EXISTS `ideasdb` (
  `id` int(11) NOT NULL auto_increment,
  `title` varchar(60) NOT NULL,
  `ideatxt` mediumtext NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=31 ;

--
-- Dumping data for table `ideasdb`
--

INSERT INTO `ideasdb` (`id`, `title`, `ideatxt`) VALUES
(1, 'Soft tissue pattern analysis ', 'Soft tissue pattern analysis -- machine learning takes webcam video feed and asseses health by facial characteristics. Relatedly, whole body health, and posture assessor? Sees whole body. Relates to http://www.deepakchopraleela.com/'),
(2, 'Guard dog app ', 'Guard dog app -- uses network of data from all devices in house to determine where strange sound is coming from. Triangulation pinpoints location. If burglar is carrying a cell phone, also listens to cell traffic src to pick up on location.'),
(3, 'Trespasser alert ', 'Trespasser alert -- detects if someone w/ a broadcasting device is in an off-limits area (perhaps this would be computer network app)'),
(4, 'Doorbell app ', 'Doorbell app -- texts you or dings if your doorbell rings?'),
(5, 'Helpmefindmymom/helpmomfindme app ', 'Helpmefindmymom/helpmomfindme app -- 1 touch app for kids lost in a theme park.'),
(6, 'Who Do I Live Like? ', 'Who Do I Live Like? -- App that analyzes computer/smartphone use patterns of people throughout the day and tells them who they use the computer/smartphone like. Would figure out if hypersuccessful people use computer diifferently. Conversations, GPS patterns, etc? I feel like this data would be invaluable and enable droves of sociological research as well as an entirely new class of apps centered around guiding/shaping lifestyle. What gets measured gets managed -- this app''s job would be to measure everything it can in the process uncovering the secrets to human behavior that can be deduced from things as subtle as accelerometer motion patterns. .This relates to my earlier post of this article -- this is the new frontier: AMAZING Application of Computer Usage Statistics: "How Depressives Surf the Web" http://www.nytimes.com/2012/06/17/opinion/sunday/how-depressed-people-use-the-internet.html?_r=1&hp. You could even give more government financial support to people who use their devices more healthily.'),
(7, 'GraceGrader ', 'GraceGrader -- App that grades how graceful you are. Correlate this with other factors about a person. Maybe could even be used for marketing/healthcare. Could be done with iphone or even webcam/computer (webcam sees if your head stays level or jerks up and down).  Maybe could even tell if you slam the keys too hard using sound data (and speed data)!.'),
(8, 'Jogging technique analysis app ', 'Jogging technique analysis app -- from machine learning of iphone app in pocket'),
(9, 'ClackerAlert ', 'ClackerAlert -- tells if you slam the keys too hard using sound data (and speed/jerkiness data)!.Prevents RSI'),
(10, 'FaceAverage ', 'FaceAverage -- Research shows that statistically speaking, if you average everybody''s face dimensions in a room of say 20 people, you would end up with a very attractive face because those with blatant asymmetries, outliers on either end of the spectrum, would cancel each other out. Develop Facebook app that tests this amongst your friends.'),
(11, 'handwriting match online either within your own sa', 'handwriting match online either within your own sample or between you and famous person,  parallel to 		iwritelike.com'),
(12, 'fisheye lenses on laptops and iPhone\\''s so that th', 'fisheye lenses on laptops and iPhone''s so that they can see the whole room -- algorithmically undistort#~Jacob'),
(13, 'wouldn\\''t it be cool if you could get captioning o', 'wouldn''t it be cool if you could get captioning of an event via iphone? Either broadcast by service, or realtime speech recognition. You could preload the txt of the speech into system to make voice recog. more accurate'),
(14, 'Slump-o-meter ', 'Slump-o-meter -- webcam (or other device!) based posture detector that tells you to go to sleep when the height of your head decreases too much during a session at the PC. A recent Stanford study showed that as the night progresses, people become progressively worse and the productivity decreases.'),
(15, 'iPhone gong/om app â€“ App that sings the same not', 'iPhone gong/om app â€“ App that sings the same note as you at a deep resonant freq OR app that makes many iPhones would resonate together to create a consistent resonating sound like a gong or â€œomâ€ for use in meditation to harmonize brain wave activity. #~Jacob'),
(16, 'iPhone backup singer/instrument app ', 'iPhone backup singer/instrument app -- would play an electric organ or vocal tone that matches the pitch that you are singing. #~Jacob'),
(17, 'CloudDream ', 'CloudDream -- creates cloud/ceiling popcorn patterns for artists to generate ideas for images. people see images in clouds: write a program that artists could use to overcome creativity barriers;  basically it would take a cloud formation image  and allow the artists to zoom in a specific part in incrementally improve something that resembles e.g. a giraffe until they have a full image. Itâ€™s easier to â€œtraceâ€ something you â€œseeâ€ in  the random patterns than to draw it from scratch. Our brains find patterns in everything. #~Jacob'),
(18, 'SpeechChat/Txting ', 'SpeechChat/Txting -- chat program that uses speech recognition/screenwriter to make it so that you can text/chat without ever looking at the screen.'),
(19, 'BikeSting #hardware ', 'BikeSting #hardware -- a chip embedded in a bike seat that gps tracks it when stolen then police place this around city watch when it gets stolen (it broadcasts it''s location to cell network) and catch the bike  theft rings then ppl are too scared to steal bikes cause they don''t know if it''s being tracked'),
(20, 'President Obama', 'President Obama'),
(21, 'Afficanized bees', 'Afficanized bees'),
(22, 'compressed air energy storage', 'compressed air energy storage'),
(23, 'President Obama', 'President Obama'),
(24, 'Africanized bees', 'Africanized bees'),
(25, 'compressed air energy storage', 'compressed air energy storage'),
(26, '???', '???'),
(27, 'What\\''s this?', 'What''s this?'),
(28, 'asdlkamda', 'asdlkamda'),
(29, 'all the things', 'all the things'),
(30, 'phone', 'phone');

-- --------------------------------------------------------

--
-- Table structure for table `links`
--

CREATE TABLE IF NOT EXISTS `links` (
  `source` int(11) NOT NULL,
  `target` int(11) NOT NULL,
  `value` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `links`
--

INSERT INTO `links` (`source`, `target`, `value`) VALUES
(1, 2, 1),
(1, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL auto_increment,
  `name` int(11) NOT NULL,
  `email` text,
  `phone` text,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `interests` text NOT NULL,
  `url` varchar(500) NOT NULL,
  `skills` text NOT NULL,
  `status` tinyint(1) NOT NULL default '0',
  `status_update_time` int(11) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=75 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `latitude`, `longitude`, `interests`, `url`, `skills`, `status`, `status_update_time`) VALUES
(7, 0, 'jp@jin.io', NULL, 42.3616, -71.09, '', '', '', 0, 0),
(18, 0, 'jinxp1@gmail.com', NULL, 42.3616, -71.09, '', '', '', 0, 0),
(24, 0, 'IDEAOVERFLOW', NULL, 42.3617, -71.0901, '', '', '', 0, 0),
(67, 0, 'sharad.vikram@gmail.com', NULL, 37.872, -122.268, 'ML, CV, AR', '', 'Javascript, Python, Servers', 0, 1350289662),
(66, 0, 'test', NULL, 42.3751, -71.1056, 'test', '', 'test', 0, 1350125609),
(22, 0, 'jp', NULL, 42.3616, -71.09, '', '', '', 0, 0),
(23, 0, 'FOO', NULL, 42.3617, -71.0901, '', '', '', 0, 0),
(65, 0, 'rudyht@gmail.com', NULL, 42.3454, -71.0903, '', '', '', 0, 1349918930),
(54, 0, 'jpx@gmail.com', NULL, 42.3561, -71.0975, 'Education', '', 'Bootstrap.js', 0, 1349595539),
(59, 0, 'tmad4000@gmail.com', NULL, 42.3588, -71.0947, 'App that tells you what to cook/orders ingredients', 'http://jacobsstuff.com', 'Web, Mobile', 0, 1349629762),
(30, 0, 'hhtcg', NULL, 42.3617, -71.0901, '', '', '', 0, 1349561833),
(31, 0, 'bloobers@mit.edu', NULL, 42.3617, -71.0901, '', '', '', 0, 1349564844),
(34, 0, 'aoeud@tht', NULL, 42.3614, -71.0906, '', '', '', 0, 1349567525),
(37, 0, 'hcole@mit.edu', NULL, 42.3614, -71.0906, '', '', '', 0, 1349569286),
(38, 0, 'mtad9000@mgail.com', NULL, 42.3614, -71.0906, '', '', '', 0, 1349578671),
(39, 0, 'nimish.pratha@gmail.com', NULL, 32.7153, -117.157, 'Translation', '', 'Comp  Linguistics', 0, 1349581777),
(41, 0, 'dron@mit.edu', NULL, 42.3751, -71.1056, 'Video Games', '', 'Image Processing', 0, 1349589551),
(55, 0, 'testable@yahoo.com', NULL, 42.3561, -71.0975, 'make beautiful website to share art', '', 'Graphic Design', 0, 1349625682),
(56, 0, 'mario.morello@hotmail.com', NULL, 51.5226, -0.0857171, 'AR', '', 'Ruby', 0, 1349627260),
(57, 0, 'dominique@xamarin.com', NULL, 51.5225, -0.0855668, 'Gaming', '', 'C#', 0, 1349627733),
(58, 0, 'anothertest', NULL, 42.3588, -71.0947, 'Sentiment Analysis', '', 'C, C++, AI', 0, 1349628049),
(53, 0, 'aoeuao@mit.edu', NULL, 42.3561, -71.0975, 'Databases of human intentions', '', 'Javascript', 0, 1349595395),
(60, 0, 'hbedri@mit.edu', NULL, 42.3585, -71.101, 'start-ups, product design, engineering, international development, social development, Islam, life-long learning', '', 'hardware design, web programming, spoken word, poetry, rapping, freestyle rapping, embedded design, product design, microcontrollers, LED''s, signal processing, image processing', 0, 1349635670),
(61, 0, 'dev.jacobcole@gmail.com', NULL, 42.3588, -71.0947, 'Figure-ground segregation/Neuro', '', 'Mathematica', 0, 1349636785),
(64, 0, 'jcole@mit.edu', NULL, 42.356, -71.0975, '', '', '', 0, 1350351704),
(68, 0, 'saurabhthemishra@gmail.com', NULL, 38.9179, -77.0448, '', '', '', 0, 1350346508),
(69, 0, 'hackathon@aurellem.org', NULL, 41.0442, -83.6499, '', '', '', 0, 1351049306),
(70, 0, 'me@delian.io', NULL, 42.3493, -71.0941, 'Tech, Mobile Payments, Education, Healthcare', '', 'Computer Science, Mathematics, Mechanical Engineering', 0, 1353292243),
(71, 0, 'cj@imreallyawesome.com', NULL, 42.4176, -71.0921, 'Mindsplosions', '', 'Inspiring others', 0, 1354067778),
(72, 0, 'igul@mit.edu', NULL, 42.3579, -71.0932, 'hacking', '', 'hacking', 0, 1355125793),
(73, 0, 'ramya@mit.edu', NULL, 42.3602, -71.0888, '', '', '', 0, 1355969788),
(74, 0, 'akashk16@mit.edu', NULL, 42.3751, -71.1056, '', '', '', 0, 1355971415);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
