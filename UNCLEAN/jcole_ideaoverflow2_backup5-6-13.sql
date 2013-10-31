-- phpMyAdmin SQL Dump
-- version 3.5.5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 06, 2013 at 04:11 PM
-- Server version: 5.0.96-community
-- PHP Version: 5.3.17

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `jcole_ideaoverflow2`
--

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
-- Table structure for table `posts`
--

CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(11) NOT NULL auto_increment,
  `time` int(11) NOT NULL,
  `body` text NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `post_ideas`
--

CREATE TABLE IF NOT EXISTS `post_ideas` (
  `pid` int(11) NOT NULL auto_increment,
  `time` bigint(20) NOT NULL,
  `body` text NOT NULL,
  `status` int(11) NOT NULL default '0',
  `progress` int(11) default NULL,
  `metric` varchar(200) NOT NULL,
  `uid` int(11) NOT NULL,
  PRIMARY KEY  (`pid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=90 ;

--
-- Dumping data for table `post_ideas`
--

INSERT INTO `post_ideas` (`pid`, `time`, `body`, `status`, `progress`, `metric`, `uid`) VALUES
(37, 1351665485, '&lt;b&gt;BOLD!&lt;/b&gt;', 0, NULL, '', 0),
(34, 1351665305, 'alert("Hi Jacob I''m going to annoy you");', 0, NULL, '', 0),
(13, 1351656482, 'Testing submit from index.', 0, NULL, '', 0),
(33, 1351665216, '<b>i can do html!</b>', 0, NULL, '', 0),
(36, 1351665469, '&lt;script type=&quot;text/javascript&quot;&gt;alert(&quot;Hi Jacob! I''m so annoying&quot;)&lt;/script&gt;', 0, NULL, '', 0),
(23, 1351660537, 'Can I submit a post?', 0, NULL, '', 0),
(38, 1353207401, 'A capella!', 0, NULL, '', 0),
(39, 1353400866, 'test', 0, NULL, '', 0),
(40, 1354063574, 'aoeu', 0, NULL, '', 0),
(29, 1351662607, 'Does it sync?', 0, NULL, '', 0),
(30, 1351663561, '	Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 0, NULL, '', 0),
(31, 1351663767, 'abc', 0, NULL, '', 0),
(32, 1351663794, 'I''m looking at electrical engineering and computer science for a major, and potentially in English literature or linguistics for a minor.  I know I also love philosophy, biology, and psychology-- time will tell how these factor into my major.  \n\nTell us what activities you are presently or hope to become involved with at MIT.\nBreakdancing, cross-country ski, martial arts, rock climbing, surfing*, snowboarding, hiking, yoga, debate, acting, SIPB, high-tech entrepreneurship/Web development business, juggling/yoyoing, Rubik''s cubing, blogging**, gaming, MIT hacking, playing RPG''s, reading science fiction and fantasy and classic literature, cooking my way to the gustatory frontier of the universe, having late-night philosophical discussions, lucid dreaming, meeting incredible people at and around MIT, eating lunch each weekend with friends going to college elsewhere in Boston, living with my best friend of 12 years as a roommate, coding late on Saturday nights with my high school programming buddy and others I''m sure to meet, forging within the smithy of my soul the uncreated conscience of my species (sorry James Joyce), and most importantly, sleeping enough on top of this. Lucid dreaming hopefully will help with this latter goal.  For the rest I''ll have to rely on Pareto''s law (the idea that statistically speaking, 20% of your resources produced 80% of the yield in real economic systems).\n*surfing is without a doubt my favorite activity on the list, though ironically, the only one that''s actually impractical to do in Boston. There''s nothing like it -- Dropping into a 7 foot barreling wave is like riding a standup, liquid roller coaster that I control (or if I fall it''s like being a cockroach in a trash compactor).\n**whether or not I become admissions blogger :)\n\nThe dormitory or FSILG you presently or hope to live with.\nI''m temped in Burton Conner, but I''m going to check out East Campus during orientation and perhaps see if I can transfer (because it''s that awesome). I love to cook, I love to work on intense projects (like installing an automatic party button in my room), I would be absolutely ecstatic to live in a dorm where I can paint murals on the walls and climb on the rock wall installed in the hallway while waiting for the scrumptious Italian delicacy I ordered by pressing the emergency pizza button to arrive.', 0, NULL, '', 0),
(41, 1354363292, 'sthsnth', 0, NULL, '', 0),
(42, 1354363314, 'transfer to mit\n', 0, NULL, '', 0),
(43, 1354363599, 'meowwwwwww\n', 0, NULL, '', 0),
(44, 1354364093, 'aoeu\naoeu\n', 0, NULL, '', 0),
(45, 1354364169, 'aoeu', 0, NULL, '', 0),
(46, 1354364175, 'aoeuaoeu', 0, NULL, '', 0),
(47, 1354364184, 'aoeu', 0, NULL, '', 0),
(48, 1354364189, 'aoeu', 0, NULL, '', 0),
(49, 1354364415, 'aoeu\n', 0, NULL, '', 0),
(50, 1354364439, 'uei\n', 0, NULL, '', 0),
(51, 1354364439, 'uei\n\n', 0, NULL, '', 0),
(52, 1354364439, 'ueid\n', 0, NULL, '', 0),
(53, 1354364439, 'euid\n', 0, NULL, '', 0),
(54, 1354364465, 'kxbm\n', 0, NULL, '', 0),
(55, 1354364471, 'kxbm\nkxbm\n', 0, NULL, '', 0),
(56, 1354366387, 'MIT-worthy high tech community ', 0, NULL, '', 0),
(57, 1354366405, 'Students healthy/happy\n', 0, NULL, '', 0),
(58, 1354366446, 'aoeu\nao\n\neu', 0, NULL, '', 0),
(59, 1354690611, 'CuriosityThread -- Site that shows the chain of questions/interests a person asked/followed to gain the knowledge they have. Perhaps to partially populate this site, Wikipedia could track threads of browsing, and scrolling. Subsequently, tutorials (even a textbook!) customized to the curiosity profiles of different people could be made of it? Relatedly, creating a web database of the series of questions bright students ask could be extremely powerful. I would love, for instance, to have documentation of the series of questions one of my friends asked over the course of his life to ultimately gain the knowledge to get gold at the International Chemistry Olympiad. #edu #&lt;-&gt;admitsphere', 0, NULL, '', 0),
(60, 1354698834, 'asdf -- #edu #intentiondb', 0, NULL, '', 0),
(61, 1354698891, 'a -- #edu\n', 0, NULL, '', 0),
(62, 1354700387, 'q -- #&lt;-&gt;a #asdf', 0, NULL, '', 0),
(63, 1354700702, '&lt;b&gt;asdf&lt;/b&gt;', 0, NULL, '', 0),
(64, 1354700792, 'asdf', 0, NULL, '', 0),
(65, 1354700799, 'asdf', 0, NULL, '', 0),
(66, 1354700845, 'asdf', 0, NULL, '', 0),
(67, 1354700895, 'a', 0, NULL, '', 0),
(68, 1354700959, 'asdf', 0, NULL, '', 0),
(69, 1354700964, '#asdf', 0, NULL, '', 0),
(70, 1354700968, '#asd', 0, NULL, '', 0),
(71, 1354702903, 'PhotoQuote -- app that lets you photograph a quote in a book, then searches online to find the boundaries of the quote you''re probably looking to note down, and adds the quote to your notebook. I find myself photographing quotes all the time. This is a big idea, and knowing the thread of quotes a person is interested in is a very powerful, and truly relevant advertising dataset. #relates to â€œsite that autocompletes quotesâ€ #intentiondb', 0, NULL, '', 0),
(72, 1354702917, 'online etymology tree #&lt;-&gt;instadefine #&lt;-&gt;admitsphere', 0, NULL, '', 0),
(73, 1354702950, 'App that tells you what to cook and automatically orders ingredients (or makes you a shopping list). Also suggest who you should cook with using the following meeting people strategy:â€\nMeet people who have similar interests by matching people to each other who have mentioned titles to the same Wikipedia articles in their gmail chats, or used the same quotes. (Or it could look at your playlist history and match by music taste! (real â€œmusicmatchâ€)). Cooking/eating is one of the few anchors to physical world in an era of increasing digital distraction, and we should use it to resurrect classic face to face socialization. Ideas. Starts with http://foodlists.tk/ #primer #lifecoach', 0, NULL, '', 0),
(74, 1354702969, '-app that uses accelerometer data to detect when you (an old person) have fallen. If you donâ€™t touch a button in 1 min cancelling emergency call, it calls your relatives who check if youâ€™re okay, and broadcasts your gps location. ~jcole likes this one -- email me if you want to work on it! #&lt;-&gt; ginger.io #lowhanging #humandatamining #machinelearning', 0, NULL, '', 0),
(75, 1354702976, '-one-touch broadcast your current location (gps) to answer text msg (â€œwhere are youâ€). #easyui #lowhanging ', 0, NULL, '', 0),
(76, 1354702985, 'ThisIsHowYouSoundRightNow (or ThisIsHowYouLookRightNow) -- app that determines if youâ€™re in â€œhack modeâ€ or â€œlazy modeâ€ (alertness level) by using machine learning on keystrokes. Make hack-o-meter. Also make it so that it shows a picture of you from webcam when youâ€™re drowiy so you look at yourself and see you need to go to sleep #humandatamining #machinelearning', 0, NULL, '', 0),
(77, 1354702993, 'Sphero app idea: make angry angry templar from SCII (http://us.battle.net/sc2/en/blog/7435938/Arcade_Highlight_%E2%80%9CAngry_Angry_Templar%E2%80%9D-9_28_2012) -- a sphero chases whoever is holding a sphero. Would use WifiSlam? #inprogress', 0, NULL, '', 0),
(78, 1354703013, 'App that tells you when to leave/what route to take so you donâ€™t get stuck in as bad of traffic. #relates to Social ridesharing app (search it on page) #lifeguiding\n', 0, NULL, '', 0),
(79, 1354703034, 'Organize related news articles into timelines so you can see the meaning of each article, and maybe join in! #intentiondb', 0, NULL, '', 0),
(80, 1354703043, 'Ambient information display app -- show imgs relevant to conversation by processing speech; e.g. saying i want to know if there is paint program for macs should autodisplay it. Inspired by Dougâ€™s #augmentedvirtuality', 0, NULL, '', 0),
(81, 1354703055, 'Wa (japanese word for personal peace) monitoring/regulating app. Maybe could use neural data. relates to gracegrader. peace within the mind leads to peace within the family, peace within the #humandatamining #machinelearning #intentiondb', 0, NULL, '', 0),
(82, 1354703066, '\n\nplaylistforlife.com -- looks at what you''re doing on pc and other devices and gives you the music for it! Or just compiles peopleâ€™s coding playlists, jogging playlists, etc and lets you look them up, mix and match, etc. Could use stereotyping after learning to predict tastes #music ', 0, NULL, '', 0),
(83, 1354703081, 'Mechanical Turk problems as reCaptcha -- service that lets you embed box that has ppl do specific types of mturk tasks AS the captcha challenges. have them do 2: one is super verified. the other less so.  Apparently, When you fill out some Google capchas it helps in Google street view For reading house numbers #hack', 0, NULL, '', 0),
(84, 1354703102, 'Social ridesharing app --  If your friends or friends of friends (on fb, linkedin, gmail/google+, etc) are going in a similar direction, they can be advised to pick you up, and vice versa. This would avoid legal problems with hitchhiking (not to mention safety issues). And then you could bring on &quot;friends of friends,&quot; people who work in same company as you, etc. to expand network into, ultimately, a general rideshare.\nRelatedly, CabShare: App that tells you whether anyone else in your vicinity is taking a cab to the same place or in the same direction. Finally, what if google maps had an integrated call a cab button when you searched directions. And/or what if this were integrated with Social Rideshare/Cabshare? Relates to database of intentions. #intentiondb #&lt;-&gt;â€App that tells you when to leave/what route to take so you donâ€™t get stuck in as bad of traffic&gt;. #lifeguiding', 0, NULL, '', 0),
(85, 1354704423, 'Browser-based distributed computing API ~SETI@home with Chrome NaCl -- Mark Vismonte started on a JS version of this... #lowhanging ', 0, NULL, '', 0),
(86, 1354781940, 'Timbre Hierarchy -- echonest analyze a song, then recursively use k-means clustering on the timbre vectors of each segment. Do this recursively (within each cluster, another k-means). k = 2 maybe. #machinelearning #echonest #musictech ', 0, 0, '', 0),
(87, 1355272177, 'Emergency Pizza Button app -- One click pizza ordering, modeled after the MIT east campus pizza button.  I actually want to do this at the next hackathon Iâ€™m at, and I think it could make a lot of money. Relatedly, I want to make â€œPush a button, get a cookieâ€ app for Insomnia Cookies. ~jcole@mit.edu', 0, 40, '', 0),
(88, 1363297761, 'KnowThyEnemy -- ChatRoulette for people in warring countries', 0, 20, '% core features built', 0),
(89, 1364528879, 'klingon', 0, NULL, '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `post_ideas_mitsugg`
--

CREATE TABLE IF NOT EXISTS `post_ideas_mitsugg` (
  `pid` int(11) NOT NULL auto_increment,
  `time` bigint(20) NOT NULL,
  `title` varchar(80) NOT NULL,
  `body` text NOT NULL,
  `status` int(11) NOT NULL default '0',
  `progress` int(11) default NULL,
  `metric` varchar(200) NOT NULL,
  `uid` int(11) NOT NULL,
  PRIMARY KEY  (`pid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=120 ;

--
-- Dumping data for table `post_ideas_mitsugg`
--

INSERT INTO `post_ideas_mitsugg` (`pid`, `time`, `title`, `body`, `status`, `progress`, `metric`, `uid`) VALUES
(37, 1351665485, '', '&lt;b&gt;BOLD!&lt;/b&gt;', 0, NULL, '', 0),
(34, 1351665305, '', 'alert("Hi Jacob I''m going to annoy you");', 0, NULL, '', 0),
(13, 1351656482, '', 'Testing submit from index.', 0, NULL, '', 0),
(33, 1351665216, '', '<b>i can do html!</b>', 0, NULL, '', 0),
(36, 1351665469, '', '&lt;script type=&quot;text/javascript&quot;&gt;alert(&quot;Hi Jacob! I''m so annoying&quot;)&lt;/script&gt;', 0, NULL, '', 0),
(23, 1351660537, '', 'Can I submit a post?', 0, NULL, '', 0),
(38, 1353207401, '', 'A capella!', 0, NULL, '', 0),
(39, 1353400866, '', 'test', 0, NULL, '', 0),
(40, 1354063574, '', 'aoeu', 0, NULL, '', 0),
(29, 1351662607, '', 'Does it sync?', 0, NULL, '', 0),
(30, 1351663561, '', '	Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 0, NULL, '', 0),
(31, 1351663767, '', 'abc', 0, NULL, '', 0),
(32, 1351663794, '', 'I''m looking at electrical engineering and computer science for a major, and potentially in English literature or linguistics for a minor.  I know I also love philosophy, biology, and psychology-- time will tell how these factor into my major.  \n\nTell us what activities you are presently or hope to become involved with at MIT.\nBreakdancing, cross-country ski, martial arts, rock climbing, surfing*, snowboarding, hiking, yoga, debate, acting, SIPB, high-tech entrepreneurship/Web development business, juggling/yoyoing, Rubik''s cubing, blogging**, gaming, MIT hacking, playing RPG''s, reading science fiction and fantasy and classic literature, cooking my way to the gustatory frontier of the universe, having late-night philosophical discussions, lucid dreaming, meeting incredible people at and around MIT, eating lunch each weekend with friends going to college elsewhere in Boston, living with my best friend of 12 years as a roommate, coding late on Saturday nights with my high school programming buddy and others I''m sure to meet, forging within the smithy of my soul the uncreated conscience of my species (sorry James Joyce), and most importantly, sleeping enough on top of this. Lucid dreaming hopefully will help with this latter goal.  For the rest I''ll have to rely on Pareto''s law (the idea that statistically speaking, 20% of your resources produced 80% of the yield in real economic systems).\n*surfing is without a doubt my favorite activity on the list, though ironically, the only one that''s actually impractical to do in Boston. There''s nothing like it -- Dropping into a 7 foot barreling wave is like riding a standup, liquid roller coaster that I control (or if I fall it''s like being a cockroach in a trash compactor).\n**whether or not I become admissions blogger :)\n\nThe dormitory or FSILG you presently or hope to live with.\nI''m temped in Burton Conner, but I''m going to check out East Campus during orientation and perhaps see if I can transfer (because it''s that awesome). I love to cook, I love to work on intense projects (like installing an automatic party button in my room), I would be absolutely ecstatic to live in a dorm where I can paint murals on the walls and climb on the rock wall installed in the hallway while waiting for the scrumptious Italian delicacy I ordered by pressing the emergency pizza button to arrive.', 0, NULL, '', 0),
(41, 1354363292, '', 'sthsnth', 0, NULL, '', 0),
(42, 1354363314, '', 'transfer to mit\n', 0, NULL, '', 0),
(43, 1354363599, '', 'meowwwwwww\n', 0, NULL, '', 0),
(44, 1354364093, '', 'aoeu\naoeu\n', 0, NULL, '', 0),
(45, 1354364169, '', 'aoeu', 0, NULL, '', 0),
(46, 1354364175, '', 'aoeuaoeu', 0, NULL, '', 0),
(47, 1354364184, '', 'aoeu', 0, NULL, '', 0),
(48, 1354364189, '', 'aoeu', 0, NULL, '', 0),
(49, 1354364415, '', 'aoeu\n', 0, NULL, '', 0),
(50, 1354364439, '', 'uei\n', 0, NULL, '', 0),
(51, 1354364439, '', 'uei\n\n', 0, NULL, '', 0),
(52, 1354364439, '', 'ueid\n', 0, NULL, '', 0),
(53, 1354364439, '', 'euid\n', 0, NULL, '', 0),
(54, 1354364465, '', 'kxbm\n', 0, NULL, '', 0),
(55, 1354364471, '', 'kxbm\nkxbm\n', 0, NULL, '', 0),
(56, 1354366387, '', 'MIT-worthy high tech community ', 0, NULL, '', 0),
(57, 1354366405, '', 'Students healthy/happy\n', 0, NULL, '', 0),
(58, 1354366446, '', 'aoeu\nao\n\neu', 0, NULL, '', 0),
(59, 1354690611, '', 'CuriosityThread -- Site that shows the chain of questions/interests a person asked/followed to gain the knowledge they have. Perhaps to partially populate this site, Wikipedia could track threads of browsing, and scrolling. Subsequently, tutorials (even a textbook!) customized to the curiosity profiles of different people could be made of it? Relatedly, creating a web database of the series of questions bright students ask could be extremely powerful. I would love, for instance, to have documentation of the series of questions one of my friends asked over the course of his life to ultimately gain the knowledge to get gold at the International Chemistry Olympiad. #edu #&lt;-&gt;admitsphere', 0, NULL, '', 0),
(60, 1354698834, '', 'asdf -- #edu #intentiondb', 0, NULL, '', 0),
(61, 1354698891, '', 'a -- #edu\n', 0, NULL, '', 0),
(62, 1354700387, '', 'q -- #&lt;-&gt;a #asdf', 0, NULL, '', 0),
(63, 1354700702, '', '&lt;b&gt;asdf&lt;/b&gt;', 0, NULL, '', 0),
(64, 1354700792, '', 'asdf', 0, NULL, '', 0),
(65, 1354700799, '', 'asdf', 0, NULL, '', 0),
(66, 1354700845, '', 'asdf', 0, NULL, '', 0),
(67, 1354700895, '', 'a', 0, NULL, '', 0),
(68, 1354700959, '', 'asdf', 0, NULL, '', 0),
(69, 1354700964, '', '#asdf', 0, NULL, '', 0),
(70, 1354700968, '', '#asd', 0, NULL, '', 0),
(71, 1354702903, '', 'PhotoQuote -- app that lets you photograph a quote in a book, then searches online to find the boundaries of the quote you''re probably looking to note down, and adds the quote to your notebook. I find myself photographing quotes all the time. This is a big idea, and knowing the thread of quotes a person is interested in is a very powerful, and truly relevant advertising dataset. #relates to â€œsite that autocompletes quotesâ€ #intentiondb', 0, NULL, '', 0),
(72, 1354702917, '', 'online etymology tree #&lt;-&gt;instadefine #&lt;-&gt;admitsphere', 0, NULL, '', 0),
(73, 1354702950, '', 'App that tells you what to cook and automatically orders ingredients (or makes you a shopping list). Also suggest who you should cook with using the following meeting people strategy:â€\nMeet people who have similar interests by matching people to each other who have mentioned titles to the same Wikipedia articles in their gmail chats, or used the same quotes. (Or it could look at your playlist history and match by music taste! (real â€œmusicmatchâ€)). Cooking/eating is one of the few anchors to physical world in an era of increasing digital distraction, and we should use it to resurrect classic face to face socialization. Ideas. Starts with http://foodlists.tk/ #primer #lifecoach', 0, NULL, '', 0),
(74, 1354702969, '', '-app that uses accelerometer data to detect when you (an old person) have fallen. If you donâ€™t touch a button in 1 min cancelling emergency call, it calls your relatives who check if youâ€™re okay, and broadcasts your gps location. ~jcole likes this one -- email me if you want to work on it! #&lt;-&gt; ginger.io #lowhanging #humandatamining #machinelearning', 0, NULL, '', 0),
(75, 1354702976, '', '-one-touch broadcast your current location (gps) to answer text msg (â€œwhere are youâ€). #easyui #lowhanging ', 0, NULL, '', 0),
(76, 1354702985, '', 'ThisIsHowYouSoundRightNow (or ThisIsHowYouLookRightNow) -- app that determines if youâ€™re in â€œhack modeâ€ or â€œlazy modeâ€ (alertness level) by using machine learning on keystrokes. Make hack-o-meter. Also make it so that it shows a picture of you from webcam when youâ€™re drowiy so you look at yourself and see you need to go to sleep #humandatamining #machinelearning', 0, NULL, '', 0),
(77, 1354702993, '', 'Sphero app idea: make angry angry templar from SCII (http://us.battle.net/sc2/en/blog/7435938/Arcade_Highlight_%E2%80%9CAngry_Angry_Templar%E2%80%9D-9_28_2012) -- a sphero chases whoever is holding a sphero. Would use WifiSlam? #inprogress', 0, NULL, '', 0),
(78, 1354703013, '', 'App that tells you when to leave/what route to take so you donâ€™t get stuck in as bad of traffic. #relates to Social ridesharing app (search it on page) #lifeguiding\n', 0, NULL, '', 0),
(79, 1354703034, '', 'Organize related news articles into timelines so you can see the meaning of each article, and maybe join in! #intentiondb', 0, NULL, '', 0),
(80, 1354703043, '', 'Ambient information display app -- show imgs relevant to conversation by processing speech; e.g. saying i want to know if there is paint program for macs should autodisplay it. Inspired by Dougâ€™s #augmentedvirtuality', 0, NULL, '', 0),
(81, 1354703055, '', 'Wa (japanese word for personal peace) monitoring/regulating app. Maybe could use neural data. relates to gracegrader. peace within the mind leads to peace within the family, peace within the #humandatamining #machinelearning #intentiondb', 0, NULL, '', 0),
(82, 1354703066, '', '\r\nplaylistforlife.com -- looks at what you''re doing on pc and other devices and gives you the music for it! Or just compiles peopleâ€™s coding playlists, jogging playlists, etc and lets you look them up, mix and match, etc. Could use stereotyping after learning to predict tastes #music ', 0, NULL, '', 0),
(83, 1354703081, '', 'Mechanical Turk problems as reCaptcha -- service that lets you embed box that has ppl do specific types of mturk tasks AS the captcha challenges. have them do 2: one is super verified. the other less so.  Apparently, When you fill out some Google capchas it helps in Google street view For reading house numbers #hack', 0, NULL, '', 0),
(84, 1354703102, '', 'Social ridesharing app --  If your friends or friends of friends (on fb, linkedin, gmail/google+, etc) are going in a similar direction, they can be advised to pick you up, and vice versa. This would avoid legal problems with hitchhiking (not to mention safety issues). And then you could bring on &quot;friends of friends,&quot; people who work in same company as you, etc. to expand network into, ultimately, a general rideshare.\nRelatedly, CabShare: App that tells you whether anyone else in your vicinity is taking a cab to the same place or in the same direction. Finally, what if google maps had an integrated call a cab button when you searched directions. And/or what if this were integrated with Social Rideshare/Cabshare? Relates to database of intentions. #intentiondb #&lt;-&gt;â€App that tells you when to leave/what route to take so you donâ€™t get stuck in as bad of traffic&gt;. #lifeguiding', 0, NULL, '', 0),
(85, 1354704423, '', 'Browser-based distributed computing API ~SETI@home with Chrome NaCl -- Mark Vismonte started on a JS version of this... #lowhanging ', 0, NULL, '', 0),
(86, 1354781940, '', 'Timbre Hierarchy -- echonest analyze a song, then recursively use k-means clustering on the timbre vectors of each segment. Do this recursively (within each cluster, another k-means). k = 2 maybe. #machinelearning #echonest #musictech ', 0, 0, '', 0),
(87, 1355272177, '', 'Emergency Pizza Button app -- One click pizza ordering, modeled after the MIT east campus pizza button.  I actually want to do this at the next hackathon Iâ€™m at, and I think it could make a lot of money. Relatedly, I want to make â€œPush a button, get a cookieâ€ app for Insomnia Cookies. ~jcole@mit.edu', 0, 40, '', 0),
(88, 1363297761, '', 'KnowThyEnemy -- ChatRoulette for people in warring countries', 0, 20, '% core features built', 0),
(89, 1364528879, '', 'klingon', 0, NULL, '', 0),
(90, 1366965163, '', 'FSILG Recycling', 2, 80, '% FSILGs that have recycling, 2012', 0),
(91, 1366965180, '', 'Reusable grocery bags in dorms', 2, 20, '% dorms that offer reusable bags, 2012', 0),
(92, 1366965187, '', 'Composting in main buildings', 2, 50, '% of critical points in main buildings with composting, 2012', 0),
(93, 1366965194, '', 'CFL Exchange', 2, 30, '% incandescent bulbs displaced by CFLs on campus, in 2012', 0),
(94, 1366965203, '', 'Motion Sens. Lighting Campus', 3, 100, '% of desired locations on campus that have motion sensor lighting', 0),
(95, 1366965211, '', 'Plastic Bag Recycling W20', 3, 100, 'Plastic bag recycling is available in W20', 0),
(96, 1366965216, '', 'Sustainability Mailing List', 3, 100, 'Created, assigned admins in student government, publicized, well-used', 0),
(97, 1366965222, '', 'Plastic Bag Recycling Dorms', 3, 100, '% Dorms with plastic bag recycling 2012', 0),
(98, 1366965229, '', 'Sustainability IAP CLASS', 3, 100, 'Created, funded, offered annually', 0),
(99, 1366965727, '', 'Student relationship w/ 1 faculty by grad ', 2, 80, '% seniors graduating w/ relationship w/ 1 faculty 2012', 0),
(100, 1366965746, '', 'Student-faculty dinners', 2, 20, '% students that attended a student-faculty dinner 2012', 0),
(101, 1366965767, '', 'Publicize faculty dinners via email to ea. class', 2, 20, '% faculty dinners students are notified of via email? (bad metric?), 2012', 0),
(102, 1366965780, '', 'Invite faculty to student-run salons', 2, 20, '% of student-run intellectual salons wanting to invite a faculty member that successfully get one to come, 2012', 0),
(103, 1366965795, '', 'Faculty eat in dining halls annually+', 2, 20, '% faculty that joined students for a meal in dining hall 2012', 0),
(104, 1366965810, '', 'Students want to attend every class', 2, 30, '% students that wanted to attend every class in 2012 based on polls', 0),
(105, 1366969201, '', 'Institute funding for intellectual salon dinners ', 2, 20, '% cost of intellectual salons covered by MIT', 0),
(110, 1366969605, '', 'Kayaks at sailing pavillion -- you should be able to explore the Charles with them. Analogous to Cambridge university boating clubs?', 1, NULL, '', 0),
(107, 1366969612, '', 'Piano in Maseeh Dining', 1, NULL, '', 0),
(106, 1366969604, '', 'Adult-sized playground on MIT Campus -- possibly place on Briggs field? Should contain obstacle course', 1, NULL, '', 0),
(112, 1366987232, '', 'Improve quality of MIT-Stanford Wormhole -- Join with media labs glasses free 3-D TV project\n', 0, NULL, '', 0),
(113, 1366987259, '', 'Interesting teas in dining halls like coconut cocoa and passion fruit and sugar plum spice. More decaf varieties\n', 0, NULL, '', 0),
(114, 1366987315, '', 'Developer office hours at MIT startlabs like at the Harvard innovation lab â€“ developers who will help you implement a prototype of your project even if you have no coding experience\n', 0, NULL, '', 0),
(115, 1366987369, '', 'Enable checkout of tennis/squash rackets at Z-center\n', 0, NULL, '', 0),
(116, 1366987411, '', 'Synch classes like 21W.789 mobile app development with venture capitalists -- startlabs, ideaoverflow, and biz school students, and people who want to get projects done. #unity\n	Comment: Iâ€™d love to work on this if anybody else does ~jcole@mit.edu\n', 1, NULL, '', 0),
(117, 1367396144, 'Improve MIT people search', 'Improve MIT people search: create url people.mit.edu for http://web.mit.edu/people.html and make cursor automatically just to search box #ist', 0, NULL, '', 0),
(118, 1367726206, 'Double paned windows in Burton Conner to keep out', 'Double paned windows in Burton Conner to keep out traffic noise', 0, NULL, '', 0),
(119, 1367776349, 'bring back a humanities requirement for freshman l', 'bring back a humanities requirement for freshman like MIT had in the 70s\n', 0, NULL, '', 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
