<?php
require_once('../../config.inc.php');
require_once(PATH.PATH_SEP.'inc/mysql.inc.php');
require_once('util_mapid.php');
require_once('util_admin_check.php');


$commentid = (int)(mysqli_real_escape_string($MYSQLI_LINK, htmlspecialchars($_REQUEST['commentid']))+0);

/*if(!$mapid) {
	header("Location: ?mapid=0");
	die("no mapid found");
}*/
	
$time = time();

$commentstbl = COMMENTS_TBL;

if (!empty($commentid)) {
    $query = "UPDATE $commentstbl SET deleted_time=$time WHERE cid=$commentid";
	print $query;
    $result = mysqli_query($MYSQLI_LINK, $query) or die("UPDATE Error: " . mysqli_error($MYSQLI_LINK));
}
