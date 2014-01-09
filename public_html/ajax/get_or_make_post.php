<?php
require_once('../../config.inc.php');
require_once(PATH.PATH_SEP.'inc/mysql.inc.php');

$body = mysqli_real_escape_string($MYSQLI_LINK, htmlspecialchars(trim($_REQUEST['newpost'])));
$mapid = (int)(mysqli_real_escape_string($MYSQLI_LINK, htmlspecialchars(trim($_REQUEST['mapid'])))+0);
$path = mysqli_real_escape_string($MYSQLI_LINK, htmlspecialchars(trim($_REQUEST['path'])));
$usrname = mysqli_real_escape_string($MYSQLI_LINK, (trim($_REQUEST['uid'])));

$defaultpath="";
$defaultparent=0;

//mit specific hack
//Utopia/Misc 197/199
if(!$path&&$mapid==3) {
	$path=$defaultpath="197/199/";
	$defaultparent=199; 
}

	
/*if(!$mapid) {
	header("Location: ?mapid=0");
	die("no mapid found");
}*/
	
$time = time();

$ideastbl = IDEAS_TBL;



if (!empty($body)) {
	$tmptitle=mysqli_real_escape_string($MYSQLI_LINK, htmlspecialchars(trim($_REQUEST['ideatitle'])));
	if(!$tmptitle)
		$tmptitle=substr($body,0,80);
    $query = "INSERT INTO $ideastbl (`pid`, `time`, `title`, `body`, `status`, `progress`, `metric`, `uid`, `parent`, `mapid`,`path`) VALUES ('', $time, '$tmptitle', '$body', 0, NULL, '', '$usrname',$defaultparent,$mapid,'$path')";
//	print $query;
    $result = mysqli_query($MYSQLI_LINK, $query) or die("INSERT Error: " . mysqli_error($MYSQLI_LINK));
}


//return progress bars info if queried
if($_GET['inProgress']) {
	$query = "SELECT * FROM $ideastbl WHERE body<>'' AND mapid=$mapid AND status > 0 ORDER BY path ASC,status ASC,time DESC";
}
//normally, return suggestions info
else {
	$query = "SELECT * FROM $ideastbl WHERE body<>'' AND mapid=$mapid ORDER BY path ASC,time DESC";
}
$result = mysqli_query($MYSQLI_LINK, $query) or die("SELECT Error: " . mysqli_error($MYSQLI_LINK));

$rows = array();

$data=array("uid"=>0,"pid"=>NULL,"children"=>array()); //root

while ($r = mysqli_fetch_assoc($result)) {
	$rows[]=$r;
	
	
	$entry=array_map(trim,array_map(stripslashes,$r));
	$entry["children"]=array();
		
	$currpath=explode('/',$entry['path']);
	
	$pData= & $data['children'];
	

	foreach($currpath as $pid) {
		if($pid!=='')
			$pData= & $pData["pid".$pid]['children'];
	}
	$pData["pid".(string)$entry['pid']]=$entry;
	
}
print json_encode(array("treePosts"=>$data,"flatPosts"=>$rows));