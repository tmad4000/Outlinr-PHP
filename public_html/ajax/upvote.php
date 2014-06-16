<?php
require_once('../../config.inc.php');
require_once(PATH.PATH_SEP.'inc/mysql.inc.php');

$ideaid = (int)(mysqli_real_escape_string($MYSQLI_LINK, htmlspecialchars($_REQUEST['ideaid']))+0);
$upvote = $_REQUEST['up'] ? 1 : ($_REQUEST['down'] ? -1 : 0);
$boolUpvote = $_REQUEST['up'] ? 1 : ($_REQUEST['down'] ? 0 : 0);
	
$time = time();

$ideastbl = IDEAS_TBL;
$votestbl = VOTES_TBL;

if (!empty($ideaid)) {
  $uip = $_SERVER['REMOTE_ADDR'];
  $checkIP = "SELECT count(1) FROM $votestbl WHERE `uip`=$uip AND `pid`=$ideaid AND `upvote`!=$boolUpvote";
  $resultCheckIP = mysqli_query($MYSQLI_LINK, $checkIP) or die("UPDATE Error: " . mysqli_error($MYSQLI_LINK));
  
  $existsIP = "SELECT count(1) FROM $votestbl WHERE uip=$uip AND pid=$ideaid";
  $resultNewIP = mysqli_query($MYSQLI_LINK, $existsIP) or die("UPDATE Error: " . mysqli_error($MYSQLI_LINK));
  if($resultCheckIP || !$existsIP){
    if(!$existsIP)
      $queryVotes = "INSERT INTO $votestbl (`pid`, `uip`, `upvote`,`time`) VALUES ($ideaid, `$uip`, !$boolUpvote, $time)";
    else
      $queryVotes = "UPDATE $votestbl SET upvote=$boolUpvote WHERE pid=$ideaid AND uip=$uip";
    $query = "UPDATE $ideastbl SET upvotes=upvotes+$upvote WHERE pid=$ideaid";
    $result = mysqli_query($MYSQLI_LINK, $query) or die("UPDATE Error: " . mysqli_error($MYSQLI_LINK));
    $res = mysqli_query($MYSQLI_LINK, $queryVotes) or die("UPDATE Error: " . mysqli_error($MYSQLI_LINK));
  }

}
