<?php
require_once('../../config.inc.php');
require_once(PATH.PATH_SEP.'inc/mysql.inc.php');
require_once('util_mapid.php');

if($_SESSION['admin_'.$mapid]!==TRUE)
	die("Not logged in to edit map id $getmapid");