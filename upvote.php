<?php
require_once('mysql.php');

$ideaid = (int)(mysqli_real_escape_string($MYSQLI_LINK, htmlspecialchars($_REQUEST['ideaid']))+0);
$upvote = $_REQUEST['up'] ? 1 : ($_REQUEST['down'] ? -1 : 0);
/*if(!$mapid) {
	header("Location: ?mapid=0");
	die("no mapid found");
}*/
	
$time = time();

$ideastbl = IDEAS_TBL;

if (!empty($ideaid)) {
    $query = "UPDATE $ideastbl SET upvotes=upvotes+$upvote WHERE pid=$ideaid";
//	print $query;
    $result = mysqli_query($MYSQLI_LINK, $query) or die("UPDATE Error: " . mysqli_error($MYSQLI_LINK));
}
