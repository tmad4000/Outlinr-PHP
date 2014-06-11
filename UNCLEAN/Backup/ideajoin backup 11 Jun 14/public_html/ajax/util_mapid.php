<?php
require_once('../../config.inc.php');
require_once(PATH.PATH_SEP.'inc/mysql.inc.php');

$ideastbl = IDEAS_TBL;
$commentstbl = COMMENTS_TBL;

$mapid=0;
if(isset($_REQUEST['mapid']))
	$mapid = (int)(mysqli_real_escape_string($MYSQLI_LINK, htmlspecialchars($_REQUEST['mapid']))+0);
elseif (isset($_REQUEST['ideaid'])) {
	$query = "SELECT mapid FROM $ideastbl WHERE pid={$_REQUEST['ideaid']}";
	  //var_dump($MYSQLI_LINK);
	$result = mysqli_query($MYSQLI_LINK, $query) or die("SELECT Error: " . mysqli_error($MYSQLI_LINK));
	$r = mysqli_fetch_assoc($result);
	$mapid = (int)$r['mapid'];
}
elseif (isset($_REQUEST['commentid'])) {
	$query = "SELECT mapid FROM $commentstbl WHERE pid={$_REQUEST['commentid']}";
	  //echo $query;
	  //var_dump($MYSQLI_LINK);
	$result = mysqli_query($MYSQLI_LINK, $query) or die("SELECT Error: " . mysqli_error($MYSQLI_LINK));
	$r = mysqli_fetch_assoc($result);
	$mapid = (int)$r['mapid'];
}