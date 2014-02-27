<?php
require_once('../../config.inc.php');
require_once(PATH.PATH_SEP.'inc/mysql.inc.php');

$commentid = (int)(mysqli_real_escape_string($MYSQLI_LINK, htmlspecialchars($_REQUEST['commentid']))+0);
$upvote = $_REQUEST['up'] ? 1 : ($_REQUEST['down'] ? -1 : 0);
/*if(!$mapid) {
	header("Location: ?mapid=0");
	die("no mapid found");
}*/
	
$time = time();

$commentstbl = COMMENTS_TBL;

if (!empty($commentid)) {
    $query = "UPDATE $commentstbl SET upvotes=upvotes+$upvote WHERE cid=$commentid";
    $result = mysqli_query($MYSQLI_LINK, $query) or die("UPDATE Error: " . mysqli_error($MYSQLI_LINK));
}