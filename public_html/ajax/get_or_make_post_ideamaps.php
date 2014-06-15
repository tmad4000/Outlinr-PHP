<?php
require_once('../../config.inc.php');
require_once(PATH.PATH_SEP.'inc/mysql.inc.php');

$maptitle = mysqli_real_escape_string($MYSQLI_LINK, htmlspecialchars($_REQUEST['newpost']));
$time = time();

$ideamapstbl = IDEAMAPS_TBL;
$ideastbl = IDEAS_TBL;

if (!empty($maptitle)) {
	$tmptitle=substr($body,0,100);
    $query = "INSERT INTO $ideamapstbl (`mapid`, `mapname`) VALUES ('', '$maptitle')";
    $result = mysqli_query($MYSQLI_LINK, $query) or die("INSERT Error: " . mysqli_error($MYSQLI_LINK));
//	print $query;
}

// $query = "SELECT $ideamapstbl.*,COUNT($ideastbl.title) AS 'count' FROM $ideamapstbl,$ideastbl WHERE $ideamapstbl.mapid=$ideastbl.mapid GROUP BY $ideastbl.mapid ORDER BY CONCAT($ideamapstbl.sortrank,  $ideamapstbl.mapname) ASC, $ideamapstbl.mapid ASC";
// $query = "SELECT $ideamapstbl.*,COUNT($ideastbl.title) AS 'count' FROM $ideamapstbl,$ideastbl WHERE $ideamapstbl.mapid=$ideastbl.mapid GROUP BY $ideastbl.mapid ORDER BY IF($ideamapstbl.sortrank>0,CONCAT($ideamapstbl.sortrank,  $ideamapstbl.mapname),9999) ASC, $ideamapstbl.mapid ASC";

// $query = "SELECT $ideamapstbl.*,COUNT($ideastbl.title) AS 'count' FROM $ideamapstbl LEFT JOIN $ideastbl ON $ideamapstbl.mapid=$ideastbl.mapid GROUP BY mapid ORDER BY IF($ideamapstbl.sortrank>0,CONCAT($ideamapstbl.sortrank,  $ideamapstbl.mapname),9999) ASC, $ideamapstbl.mapid ASC";

$query = "SELECT im.*,COUNT(it.title) AS 'count' FROM $ideamapstbl im LEFT JOIN $ideastbl it ON im.mapid=it.mapid WHERE it.deleted_time IS NULL GROUP BY mapid ORDER BY IF(im.sortrank>0,CONCAT(im.sortrank,  im.mapname),9999) ASC, im.mapid ASC";
// $query = "SELECT im.*,COUNT(it.title) AS 'count' FROM $ideamapstbl im LEFT JOIN $ideastbl it ON im.mapid=it.mapid GROUP BY mapid ORDER BY IF(im.sortrank>0,CONCAT(im.sortrank,  im.mapname),9999) ASC, im.mapid ASC";

// $query = "SELECT * FROM $ideamapstbl ORDER BY IF(sortrank>0,CONCAT(sortrank,  mapname),9999) ASC, mapid ASC";
$result = mysqli_query($MYSQLI_LINK, $query) or die("SELECT Error: " . mysqli_error($MYSQLI_LINK));

$rows = array();
while ($r = mysqli_fetch_assoc($result)) {
	$tmp=array_map(stripslashes,$r);

	if($tmp['linkurl']) {
		if(!preg_match('/^http:\//',$tmp['linkurl'])) {
			$tmp['linkurl']="http://".$tmp['linkurl'];

			if(!preg_match('/\.[A-Za-z]+$/',$tmp['linkurl']))
				$tmp['linkurl']=$tmp['linkurl'].".ideajoin.com";
		}
	}

    $rows []= $tmp;

}
print json_encode($rows);
