<?php
require_once('../../config.inc.php');
require_once(PATH.PATH_SEP.'inc/mysql.inc.php');

$body = mysqli_real_escape_string($MYSQLI_LINK, htmlspecialchars($_REQUEST['newpost']));
$mapid = (int)(mysqli_real_escape_string($MYSQLI_LINK, htmlspecialchars($_REQUEST['mapid']))+0);
/*if(!$mapid) {
	header("Location: ?mapid=0");
	die("no mapid found");
}*/
	
$time = time();

$ideastbl = IDEAS_TBL;

if (!empty($body)) {
	$tmptitle=mysqli_real_escape_string($MYSQLI_LINK, htmlspecialchars($_REQUEST['ideatitle']));
	if(!$tmptitle)
		$tmptitle=substr($body,0,80);
    $query = "INSERT INTO $ideastbl (`pid`, `time`, `title`, `body`, `status`, `progress`, `metric`, `uid`, `parent`, `mapid`) VALUES ('', $time, '$tmptitle','$body', 0, NULL, '', 0,0,$mapid)";
//	print $query;
    $result = mysqli_query($MYSQLI_LINK, $query) or die("INSERT Error: " . mysqli_error($MYSQLI_LINK));
}

$query = "SELECT * FROM $ideastbl WHERE mapid=$mapid ORDER BY time DESC";
$result = mysqli_query($MYSQLI_LINK, $query) or die("SELECT Error: " . mysqli_error($MYSQLI_LINK));

$rows = array();
while ($r = mysqli_fetch_assoc($result)) {
    $rows []= array_map(stripslashes,$r);
}

//dummy
$sugg = array_slice($rows,0,4);

print json_encode(array("sugg"=>$sugg,"allideas"=>$rows));