<?php
require_once('../../config.inc.php');
require_once(PATH.PATH_SEP.'inc/mysql.inc.php');

$maptitle = mysqli_real_escape_string($MYSQLI_LINK, htmlspecialchars($_REQUEST['name']));
$mapadminemail = mysqli_real_escape_string($MYSQLI_LINK, htmlspecialchars($_REQUEST['email']));
$mapadminpassword = mysqli_real_escape_string($MYSQLI_LINK, htmlspecialchars($_REQUEST['password']));

$ideamapstbl = IDEAMAPS_TBL;

if (!empty($maptitle)) {
    $query = "INSERT INTO $ideamapstbl (`mapid`, `mapname`, `email`, `password`) VALUES ('', '$maptitle', '$email', '$password')";
    $result = mysqli_query($MYSQLI_LINK, $query) or die("INSERT Error: " . mysqli_error($MYSQLI_LINK));
    print mysqli_insert_id($MYSQLI_LINK);
}
