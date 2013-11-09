<?php
require_once('../../config.inc.php');
require_once(PATH.PATH_SEP.'inc/mysql.inc.php');

$maptitle = mysqli_real_escape_string($MYSQLI_LINK, htmlspecialchars($_REQUEST['newpost']));
$time = time();

$ideamapstbl = IDEAMAPS_TBL;

if (!empty($maptitle)) {
	$tmptitle=substr($body,0,80);
    $query = "INSERT INTO $ideamapstbl (`mapid`, `mapname`) VALUES ('', '$maptitle')";
    $result = mysqli_query($MYSQLI_LINK, $query) or die("INSERT Error: " . mysqli_error($MYSQLI_LINK));
//	print $query;
}

$query = "SELECT * FROM $ideamapstbl ORDER BY mapid";
$result = mysqli_query($MYSQLI_LINK, $query) or die("SELECT Error: " . mysqli_error($MYSQLI_LINK));

$rows = array();
while ($r = mysqli_fetch_assoc($result)) {
    $rows []= array_map(stripslashes,$r);
}
print json_encode($rows);