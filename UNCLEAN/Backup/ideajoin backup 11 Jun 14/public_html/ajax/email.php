<?php
require_once('../../config.inc.php');
require_once(PATH.PATH_SEP.'inc/mysql.inc.php');
require_once('util_mapid.php');


$email = mysqli_real_escape_string($MYSQLI_LINK, htmlspecialchars(trim($_REQUEST['notificationemail'])));

$ideamaps = IDEAMAPS_TBL;
	if(isset($_REQUEST['notificationemail'])){
		
		require_once('util_admin_check.php');
    	$query = "UPDATE `ideamaps` SET `email`='$email' WHERE `mapid`=$mapid";
    	$result = mysqli_query($MYSQLI_LINK, $query) or die("INSERT Error: " . mysqli_error($MYSQLI_LINK));	
    }

    $getEmailQuery = "SELECT `email` FROM `ideamaps` WHERE `mapid`=$mapid";
    $getEmailResult = mysqli_query($MYSQLI_LINK, $getEmailQuery) or die("Select Error: " . mysqli_error($MYSQLI_LINK));
    $a = (mysqli_fetch_array($getEmailResult));
	$a=$a[0];

print json_encode(array('email'=>$a));