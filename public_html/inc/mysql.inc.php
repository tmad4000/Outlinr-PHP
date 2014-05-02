<?php



if(LOCAL) {
	define('DB_NAME', 'ideaoverflow2_ma');
	define('DB_USER', 'root');
	define('DB_PASS', 'root');
} 
else {
	include(PATH.PATH_SEP.'inc/remoteinfo.inc.php');
	if(!REMOTE_USER) define('REMOTE_USER', '');
	if(!REMOTE_PASS) define('REMOTE_PASS', '');

	define('DB_NAME', REMOTE_DB_NAME);
	define('DB_USER', REMOTE_USER);
	define('DB_PASS', REMOTE_PASS);
}

define('DB_HOST', 'localhost');


define('IDEAS_TBL', 'post_ideas_mitsugg');
define('COMMENTS_TBL', 'comments');
define('LINKS_TBL', 'links');
define('IDEAMAPS_TBL', 'ideamaps');


$MYSQLI_LINK = @mysqli_connect(DB_HOST, DB_USER, DB_PASS);
if(!$MYSQLI_LINK)
	$MYSQLI_LINK = mysqli_connect(DB_HOST, DB_USER, '');

//mysqli_set_charset($MYSQLI_LINK,"utf8");


mysqli_select_db($MYSQLI_LINK, DB_NAME);
