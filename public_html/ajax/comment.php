<?php
require_once('../../config.inc.php');
require_once(PATH.PATH_SEP.'inc/mysql.inc.php');
require_once('util_mapid.php');


$pid = (int)(mysqli_real_escape_string($MYSQLI_LINK, htmlspecialchars($_REQUEST['pid']))+0);
$commenttext = mysqli_real_escape_string($MYSQLI_LINK, htmlspecialchars(trim($_REQUEST['comment_text'])));
$deletecid= (int)(mysqli_real_escape_string($MYSQLI_LINK, htmlspecialchars($_REQUEST['deletecid']))+0);

	
$time = time();
$commentstbl = COMMENTS_TBL;

//Delete
if (!empty($deletecid)) {
	require_once('util_admin_check.php');
	
	$query = "UPDATE $commentstbl SET deleted_time=$time WHERE cid=$deletecid";
	$result = mysqli_query($MYSQLI_LINK, $query) or die("UPDATE Error: " . mysqli_error($MYSQLI_LINK));
}
else {

	//Create and read
	//if(!empty($pid)) {

		//create
		if (!empty($commenttext)) {
			$tmptitle=mysqli_real_escape_string($MYSQLI_LINK, htmlspecialchars(trim($_REQUEST['ideatitle'])));
			if(!$tmptitle)
				$tmptitle=substr($body,0,80);
		    $query = "INSERT INTO $commentstbl (cid, `pid`, `comment_text`,`time`, `uid`, `mapid`) VALUES ('', $pid, '$commenttext',$time, '',$mapid)";
			//print $query;
		    $result = mysqli_query($MYSQLI_LINK, $query) or die("INSERT Error: " . mysqli_error($MYSQLI_LINK));
		}

		//read
		
		if(!empty($pid))
			$where="pid=$pid AND";
		else if(!empty($mapid))
			$where="mapid=$mapid AND";
		else
			$where="";

		

		$query = "SELECT * FROM $commentstbl WHERE $where deleted_time IS NULL ORDER BY time DESC";
		

		$result = mysqli_query($MYSQLI_LINK, $query) or die("SELECT Error: " . mysqli_error($MYSQLI_LINK));
		$rows = array();

		while ($r = mysqli_fetch_assoc($result)) {

			$r=array_map(trim,array_map(stripslashes,$r));
			$rows[]=$r;
		}
		print json_encode($rows);



}

