<?php
require_once('../../config.inc.php');
require_once(PATH.PATH_SEP.'inc/mysql.inc.php');
require_once('util_mapid.php');


$pid = (int)(mysqli_real_escape_string($MYSQLI_LINK, htmlspecialchars($_REQUEST['pid']))+0);

$tid = (int)(mysqli_real_escape_string($MYSQLI_LINK, htmlspecialchars($_REQUEST['tid']))+0);

// $commenttext = mysqli_real_escape_string($MYSQLI_LINK, htmlspecialchars(trim($_REQUEST['comment_text'])));
$deletelid= (int)(mysqli_real_escape_string($MYSQLI_LINK, htmlspecialchars($_REQUEST['deletelid']))+0);

	
$time = time();
$linkstbl = LINKS_TBL;

// //Delete
if (!empty($deletelid)) {
	require_once('util_admin_check.php');
	
	$query = "UPDATE $linkstbl SET deleted_time=$time WHERE prim_key=$deletelid";
	print $query;
	$result = mysqli_query($MYSQLI_LINK, $query) or die("UPDATE Error: " . mysqli_error($MYSQLI_LINK));
	print "Deleted ".$deletelid;
}
// else {

	//Create and read
	if(!empty($pid)&&!empty($tid)) {

		//create
			//bidirectional		
		    $query = "INSERT INTO $linkstbl (prim_key, source, target, value,`time`, `uid`, `mapid`) VALUES ('', $pid, '$tid','', $time, NULL,$mapid)"; //to perfect; UID
			print $query;
		    $result = mysqli_query($MYSQLI_LINK, $query) or die("INSERT Error: " . mysqli_error($MYSQLI_LINK));
			
			$query = "INSERT INTO $linkstbl (prim_key, source, target, value,`time`, `uid`, `mapid`) VALUES ('', $tid, '$pid','', $time, NULL,$mapid)"; //to perfect; UID
			$result = mysqli_query($MYSQLI_LINK, $query) or die("INSERT Error: " . mysqli_error($MYSQLI_LINK));
			
		}

		//read
		
		// if(!empty($pid))
		// 	$where="pid=$pid AND";
		// else if(!empty($mapid))
		// 	$where="mapid=$mapid AND";
		// else
		// 	$where="";

		

		// $query = "SELECT * FROM $linkstbl WHERE $where deleted_time IS NULL ORDER BY time DESC";
		

		// $result = mysqli_query($MYSQLI_LINK, $query) or die("SELECT Error: " . mysqli_error($MYSQLI_LINK));
		// $rows = array();

		// while ($r = mysqli_fetch_assoc($result)) {
		// 	$rows[]=$r;
		// }
		// print json_encode($rows);



// }